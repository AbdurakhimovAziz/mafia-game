import * as net from 'net';
import { IPC_MESSAGES, SOCKET } from './costants';

let socket;

export const handleSocketConnect = (e, mainWindow) => {
  socket = new net.Socket();
  const { host, port } = SOCKET;
  socket.connect(port, host, () => {
    console.log('Connected');
  });
  socket.on('error', (err) => {
    console.log('Socket error', err);
    mainWindow.webContents.send(IPC_MESSAGES.SOCKET_ERROR, err);
  });
  socket.on('data', (data) => {
    const message = data.toString();
    console.log('received data from socket', data.toString());
    const splitMessage = message.split('\0');
    mainWindow.webContents.send(IPC_MESSAGES.SOCKET_DATA, splitMessage[0]);
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
