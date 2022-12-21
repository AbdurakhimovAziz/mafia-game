import { IUser } from './user';

export interface Player extends Omit<IUser, 'password' | 'email'> {}
