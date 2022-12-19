const { contextBridge, ipcRenderer } = require('electron');
const IPC_MESSAGES = {
  MESSAGE: 'message',
  SOCKET_CONNECT: 'socket-connect',
  SOCKET_DISCONNECT: 'socket-disconnect',
  SOCKET_SEND: 'socket-send',
  SOCKET_DATA: 'socket-data'
};

contextBridge.exposeInMainWorld('electronAPI', {
  send: (msg) => ipcRenderer.send(IPC_MESSAGES.MESSAGE, msg),
  on: (event, cb) => ipcRenderer.on(event, cb)
});

contextBridge.exposeInMainWorld('socket', {
  connect: (socketOpts) =>
    ipcRenderer.invoke(IPC_MESSAGES.SOCKET_CONNECT, socketOpts),
  disconnect: () => ipcRenderer.invoke(IPC_MESSAGES.SOCKET_DISCONNECT),
  send: (socketMessage) =>
    ipcRenderer.send(IPC_MESSAGES.SOCKET_SEND, socketMessage),
  handleSocketData: (cb) => ipcRenderer.on(IPC_MESSAGES.SOCKET_DATA, cb)
});
