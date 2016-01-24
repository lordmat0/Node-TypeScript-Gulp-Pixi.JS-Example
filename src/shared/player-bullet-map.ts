import {BulletMovement} from './bullet-movement';

export interface PlayerBulletMap {
    [playerId: string]: {
        [bulletId: string]: BulletMovement
    };
    /*
    Example:
    {
      'socket_id': {
        'bullet_1': {

        }: BulletMovement
      }
    }
    */
}
