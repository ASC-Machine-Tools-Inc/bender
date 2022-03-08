import { GRID_SIZE } from "./Canvas.jsx";

let canvas;
let context;

let rotation = 0;
let xScalar = 1;
let yScalar = 1;

export function initalizeCanvas() {
    canvas = document.getElementById("bender-canvas");
    if (canvas.getContext) {
        context = canvas.getContext("2d");
    }

    drawGrid();
}

function drawGrid() {
    let w = canvas.width;
    let h = canvas.height;

    context.beginPath();

    for (let x = GRID_SIZE; x < w; x += GRID_SIZE) {
        context.moveTo(x, 0);
        context.lineTo(x, h);
    }

    for (let y = GRID_SIZE; y < h; y += GRID_SIZE) {
        context.moveTo(0, y);
        context.lineTo(w, y);
    }

    context.lineWidth = 1;
    context.strokeStyle = "grey";
    context.stroke();

    // Draw axes.
    context.beginPath();

    context.moveTo(h / 2, 0);
    context.lineTo(h / 2, w);

    context.moveTo(0, w / 2);
    context.lineTo(h, w / 2);

    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.stroke();
}

export function drawPoints(points) {
    resetCanvas();
    if (points.length === 0) return;

    context.save();

    // Move origin to center.
    context.translate(canvas.width / 2, canvas.height / 2);

    // Rotate canvas.
    let rad = rotation * Math.PI / 180;
    context.rotate(rad);

    // Draw points.
    let prevX;
    let prevY;
    context.beginPath();
    for (let i = 0; i < points.length; i++) {
        let x = points[i][0] * GRID_SIZE * xScalar;
        // Flip y by default to match regular grid projection.
        let y = -points[i][1] * GRID_SIZE * yScalar;

        if (i === 0) { // Move to the starting coordinate of the line.
            context.moveTo(x, y);
        }

        context.lineTo(x, y);

        if (i > 0) { // Draw segment label.
            // TODO: don't flip labels
            drawSegmentLabel(i - 1, x, prevX, y, prevY);
        }

        prevX = x;
        prevY = y;
    }

    context.lineWidth = 8;
    context.strokeStyle = "#FCA311";
    context.stroke();

    context.restore();
}


// Prep for drawing.
function resetCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    context.font = "32px Arial";
}

function drawSegmentLabel(label, x1, x2, y1, y2) {
    let xAdj = 0;
    let yAdj = 0;

    if (x1 !== x2 && y1 === y2) {
        yAdj = -10;
    } else if (x1 === x2 && y1 !== y2) {
        xAdj = -30;
    } else {
        xAdj = -30;
        yAdj = -10;
    }

    context.fillText(label, ((x1 + x2) / 2) + xAdj, ((y1 + y2) / 2) + yAdj);
}

export function rotate(points, degrees) {
    rotation += degrees;
    drawPoints(points);
}

// Flip points over axis (0 for x axis, 1 for y axis).
export function flip(points, axis) {
    switch (axis) {
        case 0:
            yScalar *= -1;
            break;
        case 1:
            xScalar *= -1;
            break;
        default:
            console.log(`Axis code ${axis} invalid.`);
    }

    drawPoints(points);
}