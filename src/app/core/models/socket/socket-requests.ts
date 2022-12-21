import { IUser } from '../user';

export interface LobbyCreateDTO {
  lobbyName: string;
  id: IUser['id'];
  username: IUser['username'];
}

export interface LobbyJoinDTO {
  lobbyId: string;
  id: IUser['id'];
  username: IUser['username'];
}

export interface LobbyLeaveDTO extends LobbyJoinDTO {}
