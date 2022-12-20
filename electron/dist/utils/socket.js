"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocketDisconnect = exports.handleSocketSend = exports.handleSocketConnect = void 0;
var costants_1 = require("./costants");
var net = require("net");
var socket;
var handleSocketConnect = function (e, mainWindow) {
    socket = new net.Socket();
    var host = costants_1.SOCKET.host, port = costants_1.SOCKET.port;
    socket.connect(port, host, function () {
        console.log('Connected');
    });
    console.log('Socket handle', costants_1.SOCKET);
    socket.on('error', function (err) {
        console.log('Socket error', err);
    });
    socket.on('data', function (data) {
        console.log('received data from socket', data);
        mainWindow.webContents.send(costants_1.IPC_MESSAGES.SOCKET_DATA, data);
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
