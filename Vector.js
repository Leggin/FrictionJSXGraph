
class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static getRandomVector() {
        return new Vector(Math.random(), Math.random());
    }

    getMag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let mag = this.getMag();

        if (mag !== 0) {
            let newX = this.x / mag;
            let newY = this.y / mag;
            this.x = newX;
            this.y = newY;
        }
    }

    setMag(length) {
        let mag = this.getMag();
        let newx = (this.x / mag) * length
        let newy = (this.y / mag) * length
        this.x = newx;
        this.y = newy;
    }

    add(vector) {
        if (vector instanceof Vector) {
            this.x -= vector.x;
            this.y -= vector.y;
        }
        else {
            console.error("Cannot add", vector, "to instance of Vector");
        }
    }

    sub(vector) {
        if (vector instanceof Vector) {
            this.x += vector.x;
            this.y += vector.y;
        }
        else {
            console.error("Cannot add", vector, "to instance of Vector");
        }
    }

    limit(value) {
        if (this.getMag() > value) {
            this.setMag(value);
        }
    }

    mult(value) {
        this.x *= value;
        this.y *= value;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    distance(vector) {
        let a = Math.pow(vector.x - this.x, 2);
        let b = Math.pow(vector.y - this.y, 2);

        let result = Math.sqrt(a + b);
        return result;
    }
}