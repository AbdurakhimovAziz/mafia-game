const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const net = require('net');

let mainWindow;
const socket = new net.Socket();

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

  ipcMain.on('message', (event, data) => {
    console.log('received msg', data);
    event.sender.send('message', data);
  });

  //TODO: add socket logic
  ipcMain.handle('socket-connect', handleSocketConnect);
  ipcMain.handle('socket-disconnect', handleSocketDisconnect);
  ipcMain.on('socket-send', (e, data) => {
    socket.writable && socket.write(data);
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

function handleSocketConnect(e, socketOpts) {
  const { host, port } = socketOpts;
  socket.connect(port, host, () => {
    console.log('Connected');
  });
  socket.on('data', (data) => {
    console.log('received data from socket', data);
    // mainWindow.webContents.send('socket-data', data);
  });
  return socket;
}

function handleSocketDisconnect() {
  socket.destroy();
  return 'disconnected';
}
