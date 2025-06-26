const { app, BrowserWindow, ipcMain, screen } = require('electron');
const AutoLaunch = require('auto-launch');
const path = require('path');
const { createTray } = require('../tray/tray.js');
const { startKeyListener } = require('../listener/keyListener.js');

let mainWindow;

function createWindow() {
    const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

    const margin = 38;
    const windowSize = 128;

    mainWindow = new BrowserWindow({
        width: windowSize,
        height: windowSize,
        x: margin,
        y: screenHeight - windowSize - margin,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        hasShadow: false,
        skipTaskbar: true,
        resizable: false,
        focusable: false,
        fullscreenable: false,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true
        }
    });

    mainWindow.setIgnoreMouseEvents(true);
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    startKeyListener(mainWindow);
}

app.whenReady().then(() => {
    createWindow();
    createTray();

    const appLauncher = new AutoLaunch({
        name: 'DIY Typing Animation'
    });

    appLauncher.enable().catch(() => { });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', (e) => {
    e.preventDefault();
});

ipcMain.on('update-animation', (event, state) => {
    if (mainWindow) {
        mainWindow.webContents.send('update-animation', state);
    }
});