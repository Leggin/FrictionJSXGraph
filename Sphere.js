
class Sphere {
    constructor(board, x, y, friction = 0) {
        this.board = board;
        this.pos = new Vector(x, y);
        this.mass = Math.ceil(Math.random() * 20)
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.point = board.create('point', [() => { return this.pos.x }, () => { return this.pos.y }], { showInfobox: false, strokeColor: "#555555", fillColor: "#888888", withLabel: false, size: this.mass });
        this.frictionMag = friction;
        this.gravity = new Vector(0, 0.05);
        this.windForce = new Vector();

    }

    applyForce(force) {

        this.acceleration.add(force);
    }

    update() {
        let friction = this.velocity.copy();
        friction.mult(-1);
        friction.normalize();
        friction.mult(this.frictionMag);

        let w = this.windForce.copy();
        w.mult(this.mass * 0.2);
        this.applyForce(w);
        this.applyForce(friction);

        let g = this.gravity.copy();
        g.y *= this.mass * 0.2;
        this.applyForce(g);

        this.velocity.add(this.acceleration);

        this.pos.add(this.velocity);

        if (this.pos.y <= constants.bottom + this.mass / constants.radiusScale) {
            this.velocity.y *= -1;
            this.pos.y = constants.bottom + this.mass / constants.radiusScale;
        }
        if (this.pos.y >= constants.top - this.mass / constants.radiusScale) {
            this.velocity.y *= -1;
            this.pos.y = constants.top - this.mass / constants.radiusScale;

        }
        if (this.pos.x <= constants.left + this.mass / constants.radiusScale) {
            this.velocity.x *= -1;
            this.pos.x = constants.left + this.mass / constants.radiusScale;
        }
        if (this.pos.x >= constants.right - this.mass / constants.radiusScale) {
            this.velocity.x *= -1;
            this.pos.x = constants.right - this.mass / constants.radiusScale;
        }
        this.acceleration.mult(0);


    }
}