export enum IPC_MESSAGES {
  MESSAGE = 'message',
  SOCKET_CONNECT = 'socket-connect',
  SOCKET_DISCONNECT = 'socket-disconnect',
  SOCKET_SEND = 'socket-send',
  SOCKET_DATA = 'socket-data',
  SOCKET_ERROR = 'socket-error'
}

export const SOCKET = {
  port: 8000,
  host: '192.168.21.222'
};
