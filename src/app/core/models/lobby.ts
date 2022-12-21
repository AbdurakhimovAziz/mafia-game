import { Player } from './player';
import { IUser } from './user';

export interface ILobby {
  id: string;
  name: string;
  players?: Player[];
  host: IUser['username'];
  playersCount: number;
}
