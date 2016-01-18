export class AfterBurnPhysics {

    private AFTER_BURN = 5;
    private AFTER_BURN_REDUCE = 0.1;
    private burnImpulse = 0;

    getImpulse() {
        this.burnImpulse -= this.AFTER_BURN_REDUCE;
        this.burnImpulse = this.burnImpulse > 0 ? this.burnImpulse : 0;

        return this.burnImpulse;
    }

    startBurn(): void {
        this.burnImpulse = this.AFTER_BURN;
    }

    isActive(): boolean {
        return this.burnImpulse > 0;
    }
}
