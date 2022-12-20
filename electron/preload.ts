import {contextBridge, ipcRenderer} from 'electron';
import {IPC_MESSAGES} from './utils';

// contextBridge.exposeInMainWorld('electronAPI', {
//   send: (msg) => ipcRenderer.send(IPC_MESSAGES.MESSAGE, msg),
//   on: (event, cb) => ipcRenderer.on(event, cb)
// });

contextBridge.exposeInMainWorld('socket', {
  connect: () => ipcRenderer.invoke(IPC_MESSAGES.SOCKET_CONNECT),
  disconnect: () => ipcRenderer.invoke(IPC_MESSAGES.SOCKET_DISCONNECT),
  send: (socketMessage) =>
    ipcRenderer.send(IPC_MESSAGES.SOCKET_SEND, socketMessage),
  handleSocketData: (cb) => ipcRenderer.on(IPC_MESSAGES.SOCKET_DATA, cb),
  handleSocketError: (cb) => ipcRenderer.on(IPC_MESSAGES.SOCKET_ERROR, cb)
});
