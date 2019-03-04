
class Utilities {

    static map(n, start1, stop1, start2, stop2, withinBounds) {
        var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        if (!withinBounds) {
            return newval;
        }
        if (start2 < stop2) {
            return this.constrain(newval, start2, stop2);
        } else {
            return this.constrain(newval, stop2, start2);
        }
    }

    static constrain(val, lower, upper) {
        if (val < lower) {
            return lower;
        }
        if (val > upper) {
            return upper;
        }
        return val;
    }

    static createVector(x, y) {
        return { x: x, y: y };
    }

    static calcObstacle(coordsA, coordsB) {
        let x1 = coordsA[0];
        let y1 = coordsA[1];

        let x2 = coordsB[0];
        let y2 = coordsB[1];

        if (x1 > x2) {
            let tmpx = x1;
            x1 = x2;
            x2 = tmpx;
        }

        if (y1 < y2) {
            let tmpy = y1;
            y1 = y2;
            y2 = tmpy;
        }



        let w = Math.abs(x2 - x1);
        let h = Math.abs(y2 - y1);

        return [x1, y1, w, h];
    }

    static coordsSimilar(a, b) {

        if (Math.abs(a[0] - b[0]) < 3 && Math.abs(a[1] - b[1]) < 3) {
            return true;
        }
        return false;
    }


}