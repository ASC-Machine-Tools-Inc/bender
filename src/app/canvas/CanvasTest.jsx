import { useEffect } from "react";
import { Button, ButtonGroup, Col, Container } from "react-bootstrap";

function CanvasTest() {
    useEffect(() => {
        initalizeTestCanvas();
    }, []);

    return (
        <Col>
            <ButtonGroup>
                <Button
                    className="btn-secondary"
                    onClick={() => resetPoints()}
                >
                    Reset
                </Button>
                <Button
                    className="btn-secondary"
                    onClick={() => removeLastPoint()}
                >
                    Remove Last Point
                </Button>
            </ButtonGroup>

            <Container className="test-canvas-container">

                <canvas id="test-testCanvas"
                    height="500"
                    width="500"
                >
                </canvas>
            </Container>
        </Col>
    );
}

export default CanvasTest;

const GRID_SIZE = 25;

let testCanvas;
let testContext;
let testPoints = [];

function initalizeTestCanvas() {
    testCanvas = document.getElementById("test-testCanvas");
    if (testCanvas.getContext) {
        testContext = testCanvas.getContext("2d");
    }

    drawGrid();

    // Drawing event listeners.
    testCanvas.addEventListener("mousemove", handleMouseMove, false);
    testCanvas.addEventListener("mousedown", handleMouseDown, false);
}

function drawGrid() {
    let w = testCanvas.width;
    let h = testCanvas.height;

    testContext.beginPath();

    for (let x = GRID_SIZE; x < w; x += GRID_SIZE) {
        testContext.moveTo(x, 0);
        testContext.lineTo(x, h);
    }

    for (let y = GRID_SIZE; y < h; y += GRID_SIZE) {
        testContext.moveTo(0, y);
        testContext.lineTo(w, y);
    }

    testContext.lineWidth = 1;
    testContext.strokeStyle = "grey";
    testContext.stroke();

    // Draw axes.
    testContext.beginPath();

    testContext.moveTo(h / 2, 0);
    testContext.lineTo(h / 2, w);

    testContext.moveTo(0, w / 2);
    testContext.lineTo(h, w / 2);

    testContext.lineWidth = 2;
    testContext.strokeStyle = "black";
    testContext.stroke();
}

function resetCanvas() {
    testContext.clearRect(0, 0, testCanvas.width, testCanvas.height);
    drawGrid();
}

function resetPoints() {
    testPoints = [];
    resetCanvas();
}

function removeLastPoint() {
    testPoints.pop();
    resetCanvas();
    redrawLines();
}

function getMousePosition(canvas, e) {
    var boundary = canvas.getBoundingClientRect();
    // (e.clientX, e.clientY)  => Mouse coordinates wrt whole browser
    //  (boundary.left, boundary.top) => Canvas starting coordinate
    return {
        x: e.clientX - boundary.left,
        y: e.clientY - boundary.top
    };
}

// Snap to grid cell.
function snapMousePos(mousePos) {
    let xRemainder = mousePos.x % GRID_SIZE;
    if (xRemainder <= GRID_SIZE / 2) {
        mousePos.x = mousePos.x - xRemainder;
    } else {
        mousePos.x = mousePos.x + GRID_SIZE - xRemainder;
    }

    let yRemainder = mousePos.y % GRID_SIZE;
    if (yRemainder <= GRID_SIZE / 2) {
        mousePos.y = mousePos.y - yRemainder;
    } else {
        mousePos.y = mousePos.y + GRID_SIZE - yRemainder;
    }

    return mousePos;
}

// Redraw saved lines after clear.
function redrawLines() {
    if (testPoints.length === 0) return;

    testContext.beginPath();
    let firstPoint = testPoints[0];
    testContext.moveTo(firstPoint.x, firstPoint.y);

    for (let point of testPoints) {
        testContext.lineTo(point.x, point.y);

        testContext.lineWidth = "4";
        testContext.stroke();
    }
}

function handleMouseMove(e) {
    resetCanvas();
    redrawLines();

    let mousePos = getMousePosition(testCanvas, e);
    mousePos = snapMousePos(mousePos);

    // Draw preview circle.
    // TODO: might want to add some kind of throttle to this method?

    testContext.beginPath();
    testContext.arc(mousePos.x, mousePos.y, 5, 0, 2 * Math.PI, false);
    testContext.fillStyle = "gray";
    testContext.fill();

    // Draw preview line if possible.
    if (testPoints.length !== 0) {
        let lastPoint = testPoints.at(-1);

        testContext.beginPath();
        testContext.moveTo(lastPoint.x, lastPoint.y);
        testContext.lineTo(mousePos.x, mousePos.y);

        testContext.strokeStyle = "gray";
        testContext.lineWidth = "4";
        testContext.stroke();
    }
}

function handleMouseDown(e) {
    // Draw point and line.

    let mousePos = getMousePosition(testCanvas, e);
    mousePos = snapMousePos(mousePos);

    testPoints.push(mousePos);
}