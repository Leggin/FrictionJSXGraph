// "triangle*" bei point face funktioniert nicht
class Simulation {
    constructor() {
        this.board = JXG.JSXGraph.initBoard('jxgbox', { boundingbox: [constants.left, constants.top, constants.right, constants.bottom], keepaspectratio: true, axis: false, showNavigation: false, showCopyright: false, });
        this.animationPoint = this.board.create('point', [-1, 1], { visible: false });
        this.windMeasure = this.board.create('tapemeasure', [[0, 0], [20, 20]], { point2: { face: "square" } });
        this.animate = this.animate.bind(this);
        this.board.on("down", this.onMouseDown.bind(this));
        this.spheres = [];
        this.spheres.push(new Sphere(this.board, 0, 0, 0, this.windMeasure))
        this.resetAnimation = false;
        this.friction = 0;
        this.slider = document.getElementById("htmlSlider");

        this.slider.oninput = (e) => {
            this.friction = e.target.value;
            this.friction = Utilities.map(this.friction, 1, 100, 0, 0.04, true);

            this.spheres.forEach(sphere => {
                sphere.frictionMag = this.friction;
            });
        }
    }

    onMouseDown(e) {
        let coords = new JXG.Coords(JXG.COORDS_BY_SCREEN, this.board.getMousePosition(e), this.board);
        let coordCheck = [coords.usrCoords[1], coords.usrCoords[2]];
        let p1 = [this.windMeasure.point1.X(), this.windMeasure.point1.Y()];
        let p2 = [this.windMeasure.point2.X(), this.windMeasure.point2.Y()];

        if (!Utilities.coordsSimilar(coordCheck, p1) && !Utilities.coordsSimilar(coordCheck, p2)) {
            this.spheres.push(new Sphere(this.board, coords.usrCoords[1], coords.usrCoords[2], this.friction));
        }
    }

    start() {
        this.animationPoint.moveAlong(this.animate, 0);
    }

    getWindForce() {
        let p1 = new Vector(this.windMeasure.point1.X(), this.windMeasure.point1.Y());
        let p2 = new Vector(this.windMeasure.point2.X(), this.windMeasure.point2.Y());
        p2.add(p1);
        p2.mult(-1);
        p2.setMag(p2.getMag() * 0.0001);

        return p2;
    }

    animate() {
        if (!this.resetAnimation) {
            let wf = this.getWindForce();

            this.spheres.forEach(sphere => {
                sphere.windForce = wf;
                sphere.update();
            });
        } else {
        }
        //return something so the animation never stops!
        return [-1, 1];
    }
}

let s = new Simulation();
s.start();