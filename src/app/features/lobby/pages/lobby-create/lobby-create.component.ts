import { Component, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LobbyService } from '../../../../core/services/lobby/lobby.service';
import { LobbyForm } from '../../utils/types';

@Component({
  selector: 'app-lobby-create',
  templateUrl: './lobby-create.component.html',
  styleUrls: ['./lobby-create.component.scss']
})
export class LobbyCreateComponent {
  public lobbyForm = new FormGroup<LobbyForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    })
  });

  constructor(private lobbyService: LobbyService, private zone: NgZone) {}

  public createLobby(): void {
    this.lobbyService.createLobby(this.lobbyForm.getRawValue().name);
    this.lobbyForm.reset();
  }
}
