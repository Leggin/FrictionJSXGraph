class Simulation {
    constructor() {
        this.board = JXG.JSXGraph.initBoard('jxgbox', { boundingbox: [constants.left, constants.top, constants.right, constants.bottom], keepaspectratio: true, axis: true, showNavigation: false, showCopyright: false, });
        this.animationPoint = this.board.create('point', [-1, 1], { visible: false });
        this.animate = this.animate.bind(this);
        this.animationStep = 0;
        this.board.on("down", this.onMouseDown.bind(this));
        this.spheres = [];
        this.spheres.push(new Sphere(this.board, 0, 0))
    }

    onMouseDown(e) {

        let coords = new JXG.Coords(JXG.COORDS_BY_SCREEN, this.board.getMousePosition(e), this.board);

        if (!Utilities.coordsSimilar([coords.scrCoords[1], coords.scrCoords[2]], [this.targetPoint.coords.scrCoords[1], this.targetPoint.coords.scrCoords[2]])) {
        }
    }

    start() {
        this.animationPoint.moveAlong(this.animate, 0);
    }

    animate() {
        if (this.animationStep < constants.LIFESPAN) {
            this.spheres.forEach(sphere => {
                sphere.update();
            });
        } else {

        }
        this.animationStep++;

        //return something so the animation never stops!
        return [-1, 1];
    }
}

let s = new Simulation();
s.start();