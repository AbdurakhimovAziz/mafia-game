import { GAME_ROLE_NAMES } from '../../../core';

export const roles = [
  {
    icon: 'assets/images/roles/townie.png',
    name: GAME_ROLE_NAMES.TOWNIE,
    description:
      'sleeps at night, and during the day tries to identify black characters and lynch them (a vote is taken)'
  },
  {
    icon: '',
    name: GAME_ROLE_NAMES.DON,
    description:
      'head of the mafia. At night, together with the whole mafia family, he chooses a victim and carries out the judgment'
  },
  {
    icon: '',
    name: GAME_ROLE_NAMES.MAFIA,
    description:
      'member of a mafia family. At night, he chooses a victim with his family. Can become the new Don if the former is killed'
  },
  {
    icon: '',
    name: GAME_ROLE_NAMES.DETECTIVE,
    description:
      'guardian of order. At night, he can either define the role of one of the players, or kill.'
  },
  {
    icon: '',
    name: GAME_ROLE_NAMES.DOCTOR,
    description:
      'resuscitation worker. At night he can come to one of the players and save his life. Can save himself once per game.'
  }
];
