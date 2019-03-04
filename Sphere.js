
class Sphere {
    constructor(board, x, y) {
        this.board = board;
        this.pos = new Vector(x, y)
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.point = board.create('point', [() => { return this.pos.x }, () => { return this.pos.y }], { showInfobox: false, strokeColor: "#555555", fillColor: "#888888", withLabel: false, size: 3 });
        this.frictionMag = 0.005;
        this.gravity = new Vector(0, -0.05);
    }

    applyForce(force) {

        this.acceleration.add(force);
    }

    update() {

        let friction = new Vector(this.velocity.x, this.velocity.y);
        friction.mult(-1);
        friction.normalize();
        friction.mult(this.frictionMag);

        this.applyForce(friction);

        this.applyForce(this.gravity);

        this.velocity.add(this.acceleration);

        if (this.pos.y + this.velocity.y < constants.bottom || this.pos.y + this.velocity.y > constants.top) {
            this.velocity.y *= -1;
        }

        if (this.pos.x + this.velocity.x < constants.left || this.pos.x + this.velocity.x > constants.right) {
            this.velocity.x *= -1;
        }

        this.pos.add(this.velocity);
        this.acceleration.mult(0);

    }
}