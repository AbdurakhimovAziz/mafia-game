import { ILobby } from '../../../core';

export const mockLobby: ILobby = {
  id: '123',
  name: 'lobby name',
  players: [
    {
      id: '123',
      username: 'player 1',
      isAlive: true
    },
    {
      id: '123',
      username: 'player 2',
      isAlive: true
    },
    {
      id: '123',
      username: 'player 3',
      isAlive: true
    },
    {
      id: '123',
      username: 'example',
      isAlive: true
    },
    {
      id: '123',
      username: 'player 4',
      isAlive: true
    },
    {
      id: '123',
      username: 'player 5',
      isAlive: true
    },
    {
      id: '123',
      username: 'player 6',
      isAlive: true
    }
  ],
  host: 'example',
  playersCount: 1
};
