class Simulation {
    constructor() {
        this.board = JXG.JSXGraph.initBoard('jxgbox', { boundingbox: [constants.left, constants.top, constants.right, constants.bottom], keepaspectratio: true, axis: true, showNavigation: false, showCopyright: false, });
        this.animationPoint = this.board.create('point', [-1, 1], { visible: false });


        this.windSlider = this.board.create('tapemeasure', [[0, 0], [20, 20]]);


        this.animate = this.animate.bind(this);
        this.board.on("down", this.onMouseDown.bind(this));
        this.spheres = [];
        this.spheres.push(new Sphere(this.board, 0, 0))
        this.resetAnimation = false;
        this.friction = 0;
        this.slider = document.getElementById("htmlSlider");

        this.slider.oninput = (e) => {
            this.friction = e.target.value;
            this.friction = Utilities.map(this.friction, 1, 100, 0, 0.04, true);
            console.log(this.friction);

            this.spheres.forEach(sphere => {
                sphere.frictionMag = this.friction;
            });
        }
    }

    onMouseDown(e) {
        let coords = new JXG.Coords(JXG.COORDS_BY_SCREEN, this.board.getMousePosition(e), this.board);
        this.spheres.push(new Sphere(this.board, coords.usrCoords[1], coords.usrCoords[2], this.friction));
    }

    start() {
        this.animationPoint.moveAlong(this.animate, 0);
    }

    animate() {
        if (!this.resetAnimation) {
            this.spheres.forEach(sphere => {
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