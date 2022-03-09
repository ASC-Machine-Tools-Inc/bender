import "./Canvas.css";

import { useEffect } from "react";
import { Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import { faArrowsLeftRight, faArrowsUpDown, faRotateLeft, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { initalizeCanvas, drawPoints } from "./CanvasDrawing";

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
                        <ButtonGroup>
                            <Button
                                className="btn-secondary"
                                onClick={() => props.rotatePoints(-1, 1)}>
                                <FontAwesomeIcon icon={faRotateRight} />
                            </Button>
                            <Button
                                className="btn-secondary"
                                onClick={() => props.rotatePoints(1, -1)}>
                                <FontAwesomeIcon icon={faRotateLeft} />
                            </Button>
                            <Button
                                className="btn-secondary"
                                onClick={() => props.transformPoints(1, -1)}>
                                <FontAwesomeIcon icon={faArrowsUpDown} />
                            </Button>
                            <Button
                                className="btn-secondary"
                                onClick={() => props.transformPoints(-1, 1)}>
                                <FontAwesomeIcon icon={faArrowsLeftRight} />
                            </Button>
                        </ButtonGroup>
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