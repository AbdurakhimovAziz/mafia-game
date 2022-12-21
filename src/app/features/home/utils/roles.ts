import { GAME_ROLE_NAMES } from '../../../core';

export const roles = [
  {
    name: GAME_ROLE_NAMES.TOWNIE,
    description:
      'Sleeps at night, and during the day tries to identify black characters and lynch them (a vote is taken)'
  },
  {
    name: GAME_ROLE_NAMES.DON,
    description:
      'Head of the mafia. At night, together with the whole mafia family, he chooses a victim and carries out the judgment'
  },
  {
    name: GAME_ROLE_NAMES.MAFIA,
    description:
      'Member of a mafia family. At night, he chooses a victim with his family. Can become the new Don if the former is killed'
  },
  {
    name: GAME_ROLE_NAMES.DETECTIVE,
    description:
      'Guardian of order. At night, he can either define the role of one of the players, or kill.'
  },
  {
    name: GAME_ROLE_NAMES.DOCTOR,
    description:
      'Resuscitation worker. At night he can come to one of the players and save his life. Can save himself once per game.'
  }
];
