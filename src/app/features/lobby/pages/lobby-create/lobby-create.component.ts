import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LobbyCreateResponse,
  SOCKET_EVENTS,
  SocketService,
  UserService
} from '../../../../core';
import { LobbyService } from '../../../../core/services/lobby/lobby.service';
import { SubscriptionDestroyer } from '../../../../core/utils';
import { LobbyForm, mockLobby } from '../../utils';

@Component({
  selector: 'app-lobby-create',
  templateUrl: './lobby-create.component.html',
  styleUrls: ['./lobby-create.component.scss']
})
export class LobbyCreateComponent
  extends SubscriptionDestroyer
  implements OnInit
{
  public lobbyForm = new FormGroup<LobbyForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    })
  });

  constructor(
    private lobbyService: LobbyService,
    private router: Router,
    private socket: SocketService,
    private user: UserService,
    private zone: NgZone
  ) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(
      this.socket
        .on<LobbyCreateResponse>(SOCKET_EVENTS.CREATE_LOBBY)
        .subscribe((res) => {
          this.zone.run(() => {
            this.lobbyService.setCurrentLobby(res.data!);
            this.router.navigate(['play', res.data?.id]);
          });
        })
    );
  }

  public createLobby(): void {
    const user = this.user.getUser()!;
    this.lobbyService.createLobby(this.lobbyForm.getRawValue().name);

    // TODO: Remove this mock lobby
    const lobby = {
      ...mockLobby,
      name: this.lobbyForm.getRawValue().name,
      host: user.username
    };
    this.lobbyService.setCurrentLobby(lobby);
    this.router.navigate(['play', lobby.id]);

    this.lobbyForm.reset();
  }
}
