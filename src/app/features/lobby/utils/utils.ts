import { ILobby } from '../../../core';

export const mockLobby: ILobby = {
  id: '123',
  name: 'lobby name',
  players: [
    {
      id: '123',
      username: 'player 1'
    },
    {
      id: '123',
      username: 'player 2'
    },
    {
      id: '123',
      username: 'player 3'
    },
    {
      id: '123',
      username: 'example'
    },
    {
      id: '123',
      username: 'player 4'
    },
    {
      id: '123',
      username: 'player 5'
    },
    {
      id: '123',
      username: 'player 6'
    }
  ],
  host: 'example',
  playersCount: 1
};
