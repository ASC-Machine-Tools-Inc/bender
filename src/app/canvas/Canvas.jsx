import "./Canvas.css";

import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";

import { initalizeCanvas, drawPoints } from "./CanvasDrawing";
import CanvasButtons from "./CanvasButtons";

export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 500;
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
                <Row>
                    <Col>
                        <h2>2D View</h2>

                        <div className="mb-2">
                            Grid bounds:
                            Width: {CANVAS_WIDTH / GRID_SIZE} |
                            Height: {CANVAS_HEIGHT / GRID_SIZE}
                        </div>
                    </Col>

                    <Col
                        id="canvas-btns"
                        className="d-flex justify-content-end align-items-start"
                    >
                        <CanvasButtons
                            rotatePoints={props.rotatePoints}
                            transformPoints={props.transformPoints}
                        />
                    </Col>
                </Row>

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