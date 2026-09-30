const authScreen = document.getElementById('auth-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const addWidgetButton = document.getElementById('add-widget');
const logoutButton = document.getElementById('logout');
const dashboardArea = document.getElementById('dashboard-area');
const activeUsersList = document.getElementById('active-users');
const currentUserBadge = document.getElementById('current-user');

const state = {
  token: localStorage.getItem('dashboardToken') || '',
  user: null,
  widgets: [],
  users: [],
  socket: null,
  nextWidgetId: 1
};

function showScreen(name) {
  authScreen.classList.toggle('active', name === 'auth');
  dashboardScreen.classList.toggle('active', name === 'dashboard');
}

function setCurrentUser(user) {
  currentUserBadge.textContent = user ? user.username : 'Not signed in';
  currentUserBadge.style.color = '#f8fafc';
  currentUserBadge.previousElementSibling.style.background = user ? user.color || '#53d8a2' : '#53d8a2';
}

function renderUsers() {
  activeUsersList.innerHTML = '';

  if (!state.users.length) {
    const empty = document.createElement('span');
    empty.className = 'user-pill';
    empty.textContent = 'No active users';
    activeUsersList.appendChild(empty);
    return;
  }

  state.users.forEach((user) => {
    const pill = document.createElement('div');
    pill.className = 'user-pill';
    pill.innerHTML = `<span class="avatar" style="background:${user.color || '#53d8a2'}"></span><span>${user.username}</span>`;
    activeUsersList.appendChild(pill);
  });
}

function toSafeText(value) {
  return String(value ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function createWidget(data = {}) {
  return {
    id: data.id || `widget-${Date.now()}-${state.nextWidgetId++}`,
    title: data.title || 'New widget',
    content: data.content || 'Edit me...',
    x: data.x ?? 40 + (state.widgets.length * 22),
    y: data.y ?? 40 + (state.widgets.length * 18),
    width: data.width ?? 260,
    height: data.height ?? 180,
    color: data.color || ['#7c9cff', '#5ec8ff', '#53d8a2', '#ffc857', '#ff8a65'][state.widgets.length % 5],
    updatedBy: data.updatedBy || 'You'
  };
}

function emitDashboardUpdate() {
  if (!state.socket || !state.token) {
    return;
  }

  state.socket.emit('dashboard-update', { widgets: state.widgets });
}

function renderDashboard() {
  dashboardArea.innerHTML = '';

  if (!state.widgets.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'No widgets yet. Add one to get started.';
    dashboardArea.appendChild(empty);
    return;
  }

  state.widgets.forEach((widget) => {
    const widgetEl = document.createElement('div');
    widgetEl.className = 'widget';
    widgetEl.style.left = `${widget.x}px`;
    widgetEl.style.top = `${widget.y}px`;
    widgetEl.style.width = `${widget.width}px`;
    widgetEl.style.height = `${widget.height}px`;
    widgetEl.style.background = widget.color || '#162236';

    const header = document.createElement('div');
    header.className = 'widget-header';
    header.innerHTML = `
      <input class="widget-title" value="${toSafeText(widget.title)}" aria-label="Widget title" />
      <button class="icon-button delete-widget" type="button" aria-label="Delete widget">×</button>
    `;

    const content = document.createElement('textarea');
    content.className = 'widget-content';
    content.value = widget.content || '';

    const meta = document.createElement('div');
    meta.className = 'widget-meta';
    meta.textContent = `Updated by ${widget.updatedBy || 'Unknown'}`;

    const titleInput = header.querySelector('.widget-title');
    const deleteButton = header.querySelector('.delete-widget');

    titleInput.addEventListener('input', (event) => {
      widget.title = event.target.value;
      emitDashboardUpdate();
    });

    content.addEventListener('input', (event) => {
      widget.content = event.target.value;
      emitDashboardUpdate();
    });

    deleteButton.addEventListener('click', () => {
      state.widgets = state.widgets.filter((item) => item.id !== widget.id);
      emitDashboardUpdate();
      renderDashboard();
    });

    let dragStart = null;
    header.addEventListener('pointerdown', (event) => {
      if (event.target.closest('.delete-widget') || event.target.closest('.widget-title')) {
        return;
      }

      dragStart = {
        x: event.clientX - widget.x,
        y: event.clientY - widget.y
      };
      header.setPointerCapture(event.pointerId);
    });

    header.addEventListener('pointermove', (event) => {
      if (!dragStart) return;
      widget.x = Math.max(0, event.clientX - dragStart.x);
      widget.y = Math.max(0, event.clientY - dragStart.y);
      widgetEl.style.left = `${widget.x}px`;
      widgetEl.style.top = `${widget.y}px`;
    });

    header.addEventListener('pointerup', () => {
      dragStart = null;
      emitDashboardUpdate();
    });

    widgetEl.addEventListener('mouseup', () => {
      const rect = widgetEl.getBoundingClientRect();
      widget.width = Math.max(220, rect.width);
      widget.height = Math.max(150, rect.height);
      emitDashboardUpdate();
    });

    widgetEl.appendChild(header);
    widgetEl.appendChild(content);
    widgetEl.appendChild(meta);
    dashboardArea.appendChild(widgetEl);
  });
}

function connectSocket() {
  if (state.socket) {
    state.socket.disconnect();
  }

  state.socket = window.io({ auth: { token: state.token } });

  state.socket.on('connect', () => {
    state.socket.emit('join-dashboard', { token: state.token });
  });

  state.socket.on('dashboard-state', ({ widgets, users }) => {
    state.widgets = Array.isArray(widgets) ? widgets : [];
    state.users = Array.isArray(users) ? users : [];
    renderUsers();
    renderDashboard();
  });

  state.socket.on('presence', ({ users }) => {
    if (Array.isArray(users)) {
      state.users = users;
      renderUsers();
    }
  });

  state.socket.on('auth-error', ({ message }) => {
    console.error(message);
    logout();
  });
}

async function login(event) {
  event.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    alert('Please enter both a username and password.');
    return;
  }

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.error || 'Login failed.');
    return;
  }

  state.token = data.token;
  state.user = data.user;
  localStorage.setItem('dashboardToken', state.token);

  const dashboardResponse = await fetch('/api/dashboard', {
    headers: { Authorization: `Bearer ${state.token}` }
  });

  const boardData = await dashboardResponse.json();
  if (!dashboardResponse.ok) {
    alert(boardData.error || 'Could not load dashboard.');
    return;
  }

  state.widgets = Array.isArray(boardData.widgets) ? boardData.widgets : [];
  state.users = Array.isArray(boardData.users) ? boardData.users : [];

  setCurrentUser(state.user);
  renderUsers();
  renderDashboard();
  connectSocket();
  showScreen('dashboard');
}

async function logout() {
  if (state.token) {
    await fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: state.token })
    });
  }

  localStorage.removeItem('dashboardToken');
  state.token = '';
  state.user = null;
  state.widgets = [];
  state.users = [];

  if (state.socket) {
    state.socket.disconnect();
    state.socket = null;
  }

  setCurrentUser(null);
  renderUsers();
  dashboardArea.innerHTML = '';
  showScreen('auth');
  usernameInput.focus();
}

addWidgetButton.addEventListener('click', () => {
  state.widgets.push(createWidget({
    title: `Widget ${state.widgets.length + 1}`,
    content: 'Edit this content and it syncs live for everyone.',
    x: 60 + (state.widgets.length % 4) * 180,
    y: 60 + (state.widgets.length % 3) * 120
  }));
  emitDashboardUpdate();
  renderDashboard();
});

logoutButton.addEventListener('click', logout);
loginForm.addEventListener('submit', login);

if (state.token) {
  const restoreDashboard = async () => {
    const response = await fetch('/api/dashboard', {
      headers: { Authorization: `Bearer ${state.token}` }
    });

    if (response.ok) {
      const data = await response.json();
      state.user = data.me || null;
      state.widgets = Array.isArray(data.widgets) ? data.widgets : [];
      state.users = Array.isArray(data.users) ? data.users : [];
      setCurrentUser(state.user);
      renderUsers();
      renderDashboard();
      connectSocket();
      showScreen('dashboard');
    } else {
      localStorage.removeItem('dashboardToken');
      state.token = '';
      showScreen('auth');
    }
  };

  restoreDashboard();
} else {
  showScreen('auth');
}

setCurrentUser(state.user);
renderUsers();
renderDashboard();
window.addEventListener('beforeunload', () => {
  if (state.socket) {
    state.socket.disconnect();
  }
});

