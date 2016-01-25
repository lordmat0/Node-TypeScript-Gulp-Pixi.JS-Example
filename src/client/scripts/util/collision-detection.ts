import {CollisionDetail} from '../../../shared/collision-detail';

export class CollisionDetection {

    rectangleHasHit(r1: CollisionDetail, r2: CollisionDetail) {

        //Define the variables we'll need to calculate
        let combinedHalfWidths, combinedHalfHeights, vx, vy;

        //Find the center points of each sprite
        let r1centerX = r1.x + r1.width / 2;
        let r1centerY = r1.y + r1.height / 2;
        let r2centerX = r2.x + r2.width / 2;
        let r2centerY = r2.y + r2.height / 2;

        //Find the half-widths and half-heights of each sprite
        let r1halfWidth = r1.width / 2;
        let r1halfHeight = r1.height / 2;
        let r2halfWidth = r2.width / 2;
        let r2halfHeight = r2.height / 2;

        //Calculate the distance vector between the sprites
        vx = r1centerX - r2centerX;
        vy = r1centerY - r2centerY;

        //Figure out the combined half-widths and half-heights
        combinedHalfWidths = r1halfWidth + r2halfWidth;
        combinedHalfHeights = r1halfHeight + r2halfHeight;


        //Check for a collision on the x axis
        return Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights;
    }
}
