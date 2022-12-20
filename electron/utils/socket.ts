import { IPC_MESSAGES, SOCKET } from './costants';

import * as net from 'net';

let socket;

export const handleSocketConnect = (e, mainWindow) => {
  socket = new net.Socket();
  const { host, port } = SOCKET;
  socket.connect(port, host, () => {
    console.log('Connected');
  });
  console.log('Socket handle', SOCKET);
  socket.on('error', (err) => {
    console.log('Socket error', err);
  });
  socket.on('data', (data) => {
    console.log('received data from socket', data.toString());
    mainWindow.webContents.send(IPC_MESSAGES.SOCKET_DATA, data);
  });
  return 'connected';
};

export const handleSocketSend = (e, data) => {
  socket.writable && socket.write(data);
};

export const handleSocketDisconnect = () => {
  socket.destroy();
  return 'disconnected';
};
