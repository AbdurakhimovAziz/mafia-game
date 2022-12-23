"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocketDisconnect = exports.handleSocketSend = exports.handleSocketConnect = void 0;
var net = require("net");
var costants_1 = require("./costants");
var socket;
var handleSocketConnect = function (e, mainWindow) {
    socket = new net.Socket();
    var host = costants_1.SOCKET.host, port = costants_1.SOCKET.port;
    socket.connect(port, host, function () {
        console.log('Connected');
    });
    socket.on('error', function (err) {
        console.log('Socket error', err);
        mainWindow.webContents.send(costants_1.IPC_MESSAGES.SOCKET_ERROR, err);
    });
    socket.on('data', function (data) {
        var message = data.toString();
        console.log('received data from socket', data.toString());
        var splitMessage = message.split('\0');
        mainWindow.webContents.send(costants_1.IPC_MESSAGES.SOCKET_DATA, splitMessage[0]);
    });
    return 'connected';
};
exports.handleSocketConnect = handleSocketConnect;
var handleSocketSend = function (e, data) {
    socket.writable && socket.write(data);
};
exports.handleSocketSend = handleSocketSend;
var handleSocketDisconnect = function () {
    socket.destroy();
    return 'disconnected';
};
exports.handleSocketDisconnect = handleSocketDisconnect;
