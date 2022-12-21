import { ILobby } from '../lobby';

export interface LobbyCreateResponse extends ILobby {}

export interface LobbyJoinResponse extends ILobby {}

export type LobbyLeaveResponse = string;

export interface LobbyLeftResponse {
  lobbyId: string;
  username: string;
}

export interface LobbyJoinedResponse extends LobbyLeftResponse {}
