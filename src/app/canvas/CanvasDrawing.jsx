import { GRID_SIZE } from "./Canvas.jsx";

let canvas;
let context;

export function initalizeCanvas() {
    canvas = document.getElementById("bender-canvas");
    if (canvas.getContext) {
        context = canvas.getContext("2d");
    }

    drawGrid();
}

function drawGrid() {
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;

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
}

export function drawPoints(points) {
    // Prep for drawing.
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    context.font = "32px Arial";

    if (points.length === 0) return;

    // Draw points.
    let prevX;
    let prevY;
    context.beginPath();
    for (let i = 0; i < points.length; i++) {
        let x = points[i][0] * GRID_SIZE;
        let y = points[i][1] * GRID_SIZE;

        if (i === 0) {
            context.moveTo(x, y);
        }

        context.lineTo(x, y);

        if (i > 0) { // Draw segment label.
            let xAdj = 0;
            let yAdj = 0;

            if (x !== prevX && y === prevY) {
                yAdj = -10;
            } else if (x === prevX && y !== prevY) {
                xAdj = -30;
            } else {
                xAdj = -30;
                yAdj = -10;
            }

            context.fillText(i - 1, ((x + prevX) / 2) + xAdj, ((y + prevY) / 2) + yAdj);
        }

        prevX = x;
        prevY = y;
    }

    context.lineWidth = 8;
    context.strokeStyle = "#FCA311";
    context.stroke();
}