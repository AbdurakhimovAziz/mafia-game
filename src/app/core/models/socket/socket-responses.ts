import { PlayerRoles } from '../../utils';
import { ILobby } from '../lobby';
import { IUser } from '../user';
import { GameMessageDTO } from './socket-requests';

export interface LobbyCreateResponse extends ILobby {}

export interface LobbyJoinResponse extends ILobby {}

export type LobbyLeaveResponse = string;

export interface LobbyLeftResponse {
  id: IUser['id'];
  username: string;
}

export interface LobbyJoinedResponse extends LobbyLeftResponse {}

export interface GameStartResponse {
  role: PlayerRoles;
}

export interface GameMessageResponse extends GameMessageDTO {}

export interface VoteResponse {
  player: string;
  username: string;
}

export interface VoteResultResponse {
  username: string;
  role: PlayerRoles;
}

export interface GameActionResponse {
  player: string;
  role?: PlayerRoles;
  action: string;
}
