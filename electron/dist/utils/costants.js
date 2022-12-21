"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOCKET = exports.IPC_MESSAGES = void 0;
var IPC_MESSAGES;
(function (IPC_MESSAGES) {
    IPC_MESSAGES["MESSAGE"] = "message";
    IPC_MESSAGES["SOCKET_CONNECT"] = "socket-connect";
    IPC_MESSAGES["SOCKET_DISCONNECT"] = "socket-disconnect";
    IPC_MESSAGES["SOCKET_SEND"] = "socket-send";
    IPC_MESSAGES["SOCKET_DATA"] = "socket-data";
    IPC_MESSAGES["SOCKET_ERROR"] = "socket-error";
})(IPC_MESSAGES = exports.IPC_MESSAGES || (exports.IPC_MESSAGES = {}));
exports.SOCKET = {
    port: 8080,
    host: '192.168.21.222'
};
