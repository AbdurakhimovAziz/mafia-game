export enum SOCKET_EVENTS {
  MESSAGE = 'socket-message',
  GAME_MESSAGE = 'game-message',
  // LOBBY_MESSAGE = 'lobby-message',
  GAME_START = 'game-start',
  GAME_END = 'game-end',
  // GAME_DAY = 'game-day',
  // GAME_NIGHT = 'game-night',
  GAME_ACTION = 'game-action',
  GAME_VOTE = 'game-vote',
  CREATE_LOBBY = 'lobby-create',
  JOIN_LOBBY = 'lobby-join',
  LEAVE_LOBBY = 'lobby-leave',
  LOBBY_LIST = 'lobby-list',
  JOINED_LOBBY = 'lobby-joined',
  LEFT_LOBBY = 'lobby-left',
  ERROR = 'error'
}
