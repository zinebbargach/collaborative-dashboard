# Collaborative Dashboard (Static)

A fully functional, static collaborative dashboard. No server required—everything runs in your browser.

## Features

✨ **Easy to Use**
- Open `index.html` in your browser
- Add, edit, move, and resize widgets
- All data saved to browser storage
- Export/import dashboards

🎯 **What You Can Do**
- **Add widgets** - Click "+ Add Widget"
- **Edit content** - Click on title or content area
- **Drag widgets** - Click and drag the header
- **Resize widgets** - Drag the corner
- **Delete widgets** - Click the × button
- **Export dashboard** - Download as JSON
- **Clear all** - Remove all widgets

💾 **Data Storage**
- Saved automatically in browser localStorage
- Persists across browser sessions
- Can be exported and shared

## Getting Started

### Quick Start

1. **Clone or download this repo**
2. **Open `index.html` in your browser**
   - Double-click the file, or
   - Right-click → Open with Browser
3. **Start creating!**

### Or deploy it

**GitHub Pages:**
```bash
git push to your repo
Enable GitHub Pages in repo settings
Access at https://yourusername.github.io/collaborative-dashboard
```

**Vercel:**
```bash
vercel
```

**Netlify:**
Drag and drop the folder into Netlify.com

## How It Works

- **No server** - Everything runs client-side
- **No auth** - Just open and start working
- **LocalStorage** - Changes save automatically
- **Export/Import** - Share dashboards as JSON files

## Widgets

Each widget has:
- **Title** - Edit by clicking
- **Content** - Free-form text area
- **Position** - Drag to move
- **Size** - Resize by corner
- **Color** - Random on creation
- **Delete** - × button

## Tips

💡 **Headers are draggable** - Click and drag to move widgets
💡 **Corners are resizable** - Use native browser resize
💡 **Data persists** - Close and reopen browser, data is still there
💡 **Export anytime** - Download your dashboard as JSON
💡 **Share dashboards** - Export, send to others, they can import

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Basic support (touch drag works)

## Future Enhancements

For real real-time collaboration across devices, see the `production-upgrade` branch which includes:
- Server with Node.js
- Live WebSocket syncing
- Multiple users sharing one board
- Database persistence

## License

MIT - Open for any use
