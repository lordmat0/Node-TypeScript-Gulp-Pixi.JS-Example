
export class PlayerDamagerPhysics {


    calculateDamagePercentage(currentColour: number): number {
        return 0;
    }

    calculateHit(currentColour: number): number {
        if (currentColour >= 0x000000 && currentColour < 0x00ff00) {
            currentColour += 0x001100;
        } else if (currentColour === 0x00ff00 || currentColour < 0xffffff) {
            currentColour += 0x110011;
        }

        return currentColour;
    }

    calculateRecovery(currentColour: number): number {
        if (currentColour >= 0x000000 && currentColour < 0x00ff00) {
            currentColour -= 0x001100;
        } else if (currentColour === 0x00ff00 || currentColour < 0xffffff) {
            currentColour -= 0x110011;
        }

        return currentColour;
    }
}
