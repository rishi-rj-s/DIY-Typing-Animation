const { Tray, Menu, app, shell } = require('electron');
const path = require('path');

let tray = null;

function createTray() {
  tray = new Tray(path.join(__dirname, '../assets/logo.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '⭐ Star on GitHub',
      click: () => {
        shell.openExternal('https://github.com/rishi-rj-s/DIY-Typing-Animation');
      }
    },
    {
      label: 'Quit Typing Anime 💔',
      click: () => app.quit()
    }
  ]);

  tray.setToolTip('Typing Cat is watching 👀');
  tray.setContextMenu(contextMenu);
}

module.exports = { createTray };