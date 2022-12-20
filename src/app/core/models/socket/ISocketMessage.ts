import { SOCKET_EVENTS } from '../../constants';

export interface ISocketMessage<T> {
  event: SOCKET_EVENTS;
  data?: T;
}
