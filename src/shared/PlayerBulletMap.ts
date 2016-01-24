import {BulletMovement} from './bullet-movement';

export interface PlayerBulletMap {
    bullets: {
        [playerId: string]: {
            [bulletId: string]: BulletMovement
        }
    };
}
