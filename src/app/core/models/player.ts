import { PlayerRoles } from '../utils';
import { IUser } from './user';

export interface Player extends Omit<IUser, 'password' | 'email'> {
  role?: PlayerRoles;
  isAlive?: boolean;
}
