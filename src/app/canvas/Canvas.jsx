import "./Canvas.css";

import { Card, Col } from "react-bootstrap";
import { initalizeCanvas, drawPoints } from "./CanvasDrawing";
import { useEffect } from "react";

export const CANVAS_WIDTH = 600;
export const CANVAS_HEIGHT = 350;
export const GRID_SIZE = 25;

function Canvas(props) {
    useEffect(() => {
        initalizeCanvas();
    }, []);

    useEffect(() => {
        drawPoints(props.points);
    }, [props.points]);

    return (
        <Col>
            <Card>
                <h2>2D View</h2>

                <div className="mb-2">
                    Grid bounds:
                    Width: {CANVAS_WIDTH / GRID_SIZE} |
                    Height: {CANVAS_HEIGHT / GRID_SIZE}
                </div>

                <canvas
                    id="bender-canvas"
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                />
            </Card>
        </Col>
    )
}

export default Canvas;