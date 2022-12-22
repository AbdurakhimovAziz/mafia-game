import { Player } from '../player';
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

export interface StartGameDTO {
  lobbyId: string;
}

export interface GameMessageDTO extends Omit<Player, 'role'> {
  message: string;
  lobbyId: string;
  isPrivate: boolean;
}

export interface VoteDTO extends Omit<Player, 'role'> {
  lobbyId: string;
  player: string;
}

export interface GameActionDTO extends Omit<Player, 'role'> {
  lobbyId: string;
  player: string;
  action: string;
}
