"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var utils_1 = require("./utils");
var url = require("url");
var path = require("path");
var mainWindow;
var loadUrl = function () {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/mafia-game/index.html"),
        protocol: 'file:',
        slashes: true
    }));
};
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
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
    electron_1.ipcMain.on(utils_1.IPC_MESSAGES.MESSAGE, function (event, data) {
        console.log('received msg', data);
        event.sender.send('message', data);
    });
    //TODO: add socket logic
    electron_1.ipcMain.handle(utils_1.IPC_MESSAGES.SOCKET_CONNECT, function (event) {
        return (0, utils_1.handleSocketConnect)(event, mainWindow);
    });
    electron_1.ipcMain.handle(utils_1.IPC_MESSAGES.SOCKET_DISCONNECT, utils_1.handleSocketDisconnect);
    electron_1.ipcMain.on(utils_1.IPC_MESSAGES.SOCKET_SEND, function (event, data) {
        return (0, utils_1.handleSocketSend)(event, data);
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.app.on('activate', function () {
    if (mainWindow === null)
        createWindow();
});
