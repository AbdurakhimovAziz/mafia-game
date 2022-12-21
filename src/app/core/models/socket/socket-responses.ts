import { GAME_ROLE_NAMES } from '../../constants';
import { ILobby } from '../lobby';
import { IUser } from '../user';

export interface LobbyCreateResponse extends ILobby {}

export interface LobbyJoinResponse extends ILobby {}

export type LobbyLeaveResponse = string;

export interface LobbyLeftResponse {
  id: IUser['id'];
  username: string;
}

export interface LobbyJoinedResponse extends LobbyLeftResponse {}

export interface GameStartResponse {
  role: GAME_ROLE_NAMES;
}
