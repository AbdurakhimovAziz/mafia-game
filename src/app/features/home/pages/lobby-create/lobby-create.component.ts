import { Component, NgZone } from '@angular/core';
import { LobbyService } from '../../../../core/services/lobby/lobby.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LobbyForm } from '../../utils';

@Component({
  selector: 'app-lobby-create',
  templateUrl: './lobby-create.component.html',
  styleUrls: ['./lobby-create.component.scss']
})
export class LobbyCreateComponent {
  public lobbyForm = new FormGroup<LobbyForm>({
    name: new FormControl('', { nonNullable: true }),
    maxPlayers: new FormControl(7, { nonNullable: true })
  });

  constructor(private lobbyService: LobbyService, private zone: NgZone) {}

  public createLobby(): void {
    this.lobbyService.createLobby();
  }
}
