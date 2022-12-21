import { ILobby } from '../../../core';

export const mockLobby: ILobby = {
  id: '123',
  name: 'lobby name',
  players: [
    {
      id: '123',
      username: 'test'
    },
    {
      id: '123',
      username: 'example'
    },
    {
      id: '123',
      username: 'test'
    },
    {
      id: '123',
      username: 'example'
    },
    {
      id: '123',
      username: 'test'
    },
    {
      id: '123',
      username: 'example'
    },
    {
      id: '123',
      username: 'test'
    }
  ],
  host: 'example',
  playersCount: 1
};
