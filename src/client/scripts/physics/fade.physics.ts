
export class FadePhysics {

    constructor(private fadeInMax: number, private fadeOutMax, private fadeInSpeed, private fadeOutSpeed) {
    }

    fadeIn(current: number) {
        if (current < this.fadeInMax) {
            current += this.fadeInSpeed;
        } else {
            current = this.fadeInMax;
        }

        return current;
    }

    fadeOut(current: number) {
        if (current > this.fadeOutMax) {
            current -= this.fadeOutSpeed;
        } else {
            current = this.fadeOutSpeed;
        }
        return current;
    }
}
