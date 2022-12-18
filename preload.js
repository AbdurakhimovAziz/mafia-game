const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  send: (mdg) => ipcRenderer.send('msg', mdg),
  on: (event, cb) => ipcRenderer.on(event, cb)
});
