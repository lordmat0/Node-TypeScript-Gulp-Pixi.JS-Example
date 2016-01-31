export class Random {
    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    static getInt(min = 0, max = Number.MAX_VALUE) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getFloat(min = 0, max = Number.MAX_VALUE) {
        return Math.random() * (max - min + 1) + min;
    }

}
