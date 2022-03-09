import { GRID_SIZE } from "./Canvas.jsx";
import { getAngle } from "../points/PointsTable.jsx";

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

    // Draw points.
    let prevX;
    let prevY;
    context.beginPath();
    for (let i = 0; i < points.length; i++) {
        let x = points[i][0] * GRID_SIZE;
        // Flip y by default to match regular grid projection.
        let y = -points[i][1] * GRID_SIZE;

        if (i === 0) { // Move to the starting coordinate of the line.
            context.moveTo(x, y);
        }

        context.lineTo(x, y);

        if (i > 0) { // Draw segment label.
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

    // Adjust angles basted on rotation.
    let segmentAngle = getAngle([x2, y2], [x1, y1]);
    if (segmentAngle < 0) segmentAngle += 360; // Adjust angle to [0, 360] range.

    if (x1 !== x2 && y1 === y2) { // Horizontal line.
        xAdj = -5;
        yAdj = -20;
    } else if (x1 === x2 && y1 !== y2) { // Vertical line.
        xAdj = -30;
        yAdj = -5;
    } else if ((segmentAngle >= 90 && segmentAngle <= 180) ||
        (segmentAngle >= 270 && segmentAngle <= 360)) { // Quadrants 1 & 3.
        xAdj = -30;
        yAdj = -5;
    } else { // Quadrants 2 & 4.
        xAdj = 30;
        yAdj = -5;
    }

    // Apply counter-rotation. Need to apply to points too?
    context.save();

    // Move origin to text position.
    let xPos = ((x1 + x2) / 2) + xAdj;
    let yPos = ((y1 + y2) / 2) + yAdj;
    context.translate(xPos, yPos);

    context.fillText(label, 0, 0);

    context.restore();
}
