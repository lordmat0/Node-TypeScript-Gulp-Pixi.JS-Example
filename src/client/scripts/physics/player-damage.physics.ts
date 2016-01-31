
export class PlayerDamagePhysics {


    calculateDamagePercentage(currentColour: number): number {
        let damagePercentage = 0;

        if (currentColour >= 0x000000 && currentColour < 0x00ff00) {
            damagePercentage = (currentColour - 0x003300) / (0x00ff00 - 0x003300) * (0.44444444444 - 0) + 0;
        } else if (currentColour === 0x00ff00 || currentColour < 0xffffff) {
            damagePercentage = (currentColour - 0x00ff00) / (0xffffff - 0x00ff00) * (1 - 0.44444444444) + 0.44444444444;
        }

        return damagePercentage;
    }

    calculateHit(currentColour: number): number {
        if (currentColour >= 0x000000 && currentColour < 0x00ff00) {
            currentColour += 0x000300;
        } else if (currentColour === 0x00ff00 || currentColour < 0xffffff) {
            currentColour += 0x030003;
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
