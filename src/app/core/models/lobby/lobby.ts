import { IUser } from '../user';

export interface ILobby {
  id: string;
  name: string;
  players?: IUser[];
  maxPlayers: number;
}
