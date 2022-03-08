import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { CANVAS_WIDTH, CANVAS_HEIGHT, GRID_SIZE } from "../canvas/Canvas.jsx";

function PointsInput(props) {
    const [pointsInput, setPointsInput] = useState("");
    const [pointsInvalid, setPointsInvalid] = useState(false);

    const validatePoints = (evt) => {
        evt.preventDefault();

        let coordsList = [];
        if (pointsInput.length > 0) {
            let pointsList = pointsInput.split(", ");
            // Regex for matching points in the form [x,y].
            let pointRegex = new RegExp("^[\\[]-?\\d+[,]-?\\d+[\\]]$");

            for (let point of pointsList) {
                let coords = point.slice(1, -1).split(',').map(p => parseInt(p));
                coordsList.push(coords);

                // Check that the point matches the regex and is within the bounds.
                if (!pointRegex.test(point) ||
                    coords[0] > (CANVAS_WIDTH / GRID_SIZE / 2) ||
                    coords[0] < -(CANVAS_WIDTH / GRID_SIZE / 2) ||
                    coords[1] > (CANVAS_HEIGHT / GRID_SIZE / 2) ||
                    coords[1] < -(CANVAS_WIDTH / GRID_SIZE / 2)) {
                    setPointsInvalid(true);
                    return;
                }
            }
        }

        setPointsInvalid(false);
        props.setPoints(coordsList);
    }

    // Load demo for outside corner part.
    const loadTest = () => {
        let pointsInput = "[-7,4], [-8,4], [-6,4], [-4,6], [4,6], [4,-4], [2,-6], [2,-8], [2,-7]";
        setPointsInput(pointsInput);

        let points = [[-7, 4], [-8, 4], [-6, 4], [-4, 6], [4, 6], [4, -4], [2, -6], [2, -8], [2, -7]];
        props.setPoints(points);

        setPointsInvalid(false);
    }

    return (
        <Card>
            <Form onSubmit={validatePoints}>
                <Form.Group>
                    <h2>Points</h2>
                    <Form.Control
                        value={pointsInput}
                        onChange={e => setPointsInput(e.target.value)}
                        isInvalid={pointsInvalid}
                        placeholder=
                        "Enter a list of points. (Ex: [1,2], [3,4])"
                    />

                    <Row className="mt-3">
                        <Col>
                            <Button className="btn-secondary" onClick={loadTest}>
                                Load Test
                            </Button>
                        </Col>
                        <Col>
                            <Button className="btn-secondary mb-2" type="submit">
                                Bend it!
                            </Button>
                        </Col>
                    </Row>

                    <Form.Control.Feedback type="invalid">
                        Unable to parse your list of points. Please make sure they
                        are in the format [x,y], comma and space separated, and
                        within the canvas grid bounds.
                    </Form.Control.Feedback>
                </Form.Group>
            </Form>
        </Card>
    );
}

export default PointsInput;