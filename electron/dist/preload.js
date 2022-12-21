"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var utils_1 = require("./utils");
// contextBridge.exposeInMainWorld('electronAPI', {
//   send: (msg) => ipcRenderer.send(IPC_MESSAGES.MESSAGE, msg),
//   on: (event, cb) => ipcRenderer.on(event, cb)
// });
electron_1.contextBridge.exposeInMainWorld('socket', {
    connect: function () { return electron_1.ipcRenderer.invoke(utils_1.IPC_MESSAGES.SOCKET_CONNECT); },
    disconnect: function () { return electron_1.ipcRenderer.invoke(utils_1.IPC_MESSAGES.SOCKET_DISCONNECT); },
    send: function (socketMessage) {
        return electron_1.ipcRenderer.send(utils_1.IPC_MESSAGES.SOCKET_SEND, socketMessage);
    },
    handleSocketData: function (cb) { return electron_1.ipcRenderer.on(utils_1.IPC_MESSAGES.SOCKET_DATA, cb); },
    handleSocketError: function (cb) { return electron_1.ipcRenderer.on(utils_1.IPC_MESSAGES.SOCKET_ERROR, cb); }
});
