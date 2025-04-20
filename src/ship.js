class Ship{
    constructor(length, hits = 0) {
        this.length = length;
        this.hits = hits;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits >= this.length ? true : false
    }

    getHits() {
        return this.hits
    }
}

module.exports = Ship;