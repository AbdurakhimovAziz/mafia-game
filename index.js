const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const net = require('net');

let mainWindow;

const loadUrl = () => {
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/mafia-game/index.html`),
      protocol: 'file:',
      slashes: true
    })
  );
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  loadUrl();

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-fail-load', loadUrl);

  ipcMain.on('msg', (event, data) => {
    console.log('received msg', data);
    event.sender.send('msg', data);
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
