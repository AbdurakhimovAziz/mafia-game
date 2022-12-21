import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

import * as url from 'url';
import {
  handleSocketConnect,
  handleSocketDisconnect,
  handleSocketSend,
  IPC_MESSAGES
} from './utils';

let mainWindow: BrowserWindow;

const loadUrl = () => {
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/index.html`),
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

  ipcMain.handle(IPC_MESSAGES.SOCKET_CONNECT, (event) =>
    handleSocketConnect(event, mainWindow)
  );
  ipcMain.handle(IPC_MESSAGES.SOCKET_DISCONNECT, handleSocketDisconnect);
  ipcMain.on(IPC_MESSAGES.SOCKET_SEND, (event, data) =>
    handleSocketSend(event, data)
  );
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
