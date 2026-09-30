* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Inter, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #111827 0%, #0f172a 100%);
  color: #e5e7eb;
}

button,
input,
textarea {
  font: inherit;
}

#app {
  min-height: 100vh;
}

.screen {
  display: none;
}

.screen.active {
  display: block;
}

#auth-screen {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.auth-card {
  width: min(440px, 100%);
  padding: 32px 28px;
  border-radius: 22px;
  background: rgba(17, 24, 39, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 25px 65px rgba(15, 23, 42, 0.55);
}

.auth-card h1 {
  margin: 0 0 8px;
  font-size: clamp(2rem, 5vw, 2.6rem);
}

.auth-card p {
  margin: 0 0 24px;
  color: #b4bfd4;
}

#login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-row label {
  font-size: 0.9rem;
  color: #c7d2fe;
}

.input-row input {
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.9);
  color: #f8fafc;
  padding: 12px 14px;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

.input-row input:focus {
  outline: none;
  border-color: #7c9cff;
  box-shadow: 0 0 0 3px rgba(124, 156, 255, 0.15);
}

.primary-button,
.secondary-button,
.icon-button {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.primary-button:hover,
.secondary-button:hover,
.icon-button:hover {
  transform: translateY(-1px);
}

.primary-button {
  background: linear-gradient(135deg, #7c9cff 0%, #5ec8ff 100%);
  color: white;
  padding: 12px 16px;
  font-weight: 700;
}

#dashboard-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 24px;
  background: rgba(15, 23, 42, 0.85);
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
  backdrop-filter: blur(14px);
}

.brand h2 {
  margin: 0;
  font-size: 1.1rem;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.user-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(124, 156, 255, 0.2);
  border: 1px solid rgba(124, 156, 255, 0.25);
}

.avatar {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #53d8a2;
  box-shadow: 0 0 10px rgba(83, 216, 162, 0.7);
}

.user-list {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.user-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(148, 163, 184, 0.14);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 999px;
  padding: 8px 10px;
  font-size: 0.8rem;
}

.secondary-button {
  background: rgba(148, 163, 184, 0.16);
  color: white;
  padding: 10px 16px;
  border: 1px solid rgba(148, 163, 184, 0.18);
}

#dashboard-area {
  position: relative;
  flex: 1;
  min-height: 620px;
  padding: 18px;
  overflow: auto;
  background: radial-gradient(circle at top left, rgba(124, 156, 255, 0.08), transparent 30%), #0f172a;
}

.widget {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 220px;
  min-height: 150px;
  border-radius: 18px;
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  resize: both;
}

.widget-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px 10px;
  background: rgba(15, 23, 42, 0.25);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  cursor: grab;
  user-select: none;
}

.widget-header:active {
  cursor: grabbing;
}

.widget-title {
  background: transparent;
  border: none;
  color: white;
  font-weight: 700;
  width: 100%;
  padding: 0;
}

.widget-title:focus,
.widget-content:focus {
  outline: 2px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
}

.icon-button {
  width: 32px;
  height: 32px;
  background: rgba(15, 23, 42, 0.35);
  color: white;
}

.widget-content {
  flex: 1;
  width: 100%;
  resize: none;
  background: transparent;
  border: none;
  color: white;
  padding: 14px;
  line-height: 1.55;
  font-size: 0.96rem;
}

.widget-content::-webkit-scrollbar {
  width: 8px;
}

.widget-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
}

.widget-meta {
  padding: 0 14px 12px;
  font-size: 0.72rem;
  opacity: 0.8;
}

.empty-state {
  padding: 32px;
  color: #cbd5e1;
}

@media (max-width: 700px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  #dashboard-area {
    min-height: 500px;
  }
}

