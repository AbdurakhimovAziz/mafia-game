import { IUser } from '../user';

export interface ILobby {
  id: string;
  name: string;
  players?: Omit<IUser, 'email' | 'password'>[];
  host: IUser['username'];
  playersCount: number;
}
