import { FormControl } from '@angular/forms';

export type LobbyForm = {
  name: FormControl<string>;
  maxPlayers: FormControl<number>;
};
