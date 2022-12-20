export enum IPC_MESSAGES {
  MESSAGE = 'message',
  SOCKET_CONNECT = 'socket-connect',
  SOCKET_DISCONNECT = 'socket-disconnect',
  SOCKET_SEND = 'socket-send',
  SOCKET_DATA = 'socket-data'
}

export const SOCKET = {
  port: 8080,
  host: '192.168.21.222'
};
