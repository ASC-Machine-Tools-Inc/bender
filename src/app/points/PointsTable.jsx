import { Card, Row, Table } from "react-bootstrap";

function PointsTable(props) {
    const segmentData = processPoints(props.points);

    const middleBend = getMiddleBend(props.points);

    return (
        <Card>
            <h2>Segments</h2>

            <Table striped bordered size="sm">
                <thead>
                    <tr>
                        <th>Segment</th>
                        <th>Length</th>
                        <th>Angle</th>
                        <th>Bend Angle</th>
                        <th>Orientation</th>
                    </tr>
                </thead>
                <tbody>
                    {segmentData}
                </tbody>
            </Table>

            {middleBend != null &&
                <div>
                    Middle bend(s): {middleBend}
                </div>
            }
        </Card>
    );
}

export default PointsTable;

function getMiddleBend(points) {
    let middle = null;

    if (points.length > 0) {
        let i = Math.floor(points.length / 2);
        middle = points.length % 2 == 0 ?
            `[${points[i - 1].toString()}], [${points[i].toString()}]` :
            `[${points[i].toString()}]`
    }

    return middle;
}

function processPoints(points) {
    let segmentData = [];

    for (let i = 1; i < points.length; i++) {
        let prevPrev = points[i - 2];
        let prev = points[i - 1];
        let curr = points[i];

        let length = roundToTwo(Math.hypot(curr[0] - prev[0], curr[1] - prev[1]));

        // Relative to x-axis.
        let angle = roundToTwo(getAngle(prev, curr));
        if (angle < 0) angle += 360; // [0, 360]; clockwise; 0° = east

        // Relative to last segment.
        let bendAngle;
        let orientation;
        if (i >= 2) {
            bendAngle = roundToTwo(getBendAngle(prevPrev, prev, curr));
            orientation = getOrientation(prevPrev, prev, curr);
        }

        segmentData.push(
            <tr key={i}>
                <td>{i - 1}</td>
                <td>{length}</td>
                <td>{angle}</td>
                <td>{bendAngle}</td>
                <td>{orientation}</td>
            </tr>
        );
    }

    return segmentData;
}

// Rounds to two decimal places only if necessary. (10 -> 10, 10.532 -> 10.53)
function roundToTwo(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

// Get the angle from the x-axis for a segment.
function getAngle(prev, curr) {
    let dx = prev[0] - curr[0];
    let dy = prev[1] - curr[1];
    let theta = Math.atan2(-dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = east
    theta *= 180 / Math.PI;           // [0, 180] then [-180, 0]; clockwise; 0° = east
    return theta;
}

// Get the smaller angle between two segments made up of three points.
function getBendAngle(a, b, c) {
    let ab = Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
    let bc = Math.sqrt(Math.pow(b[0] - c[0], 2) + Math.pow(b[1] - c[1], 2));
    let ac = Math.sqrt(Math.pow(c[0] - a[0], 2) + Math.pow(c[1] - a[1], 2));
    let acos = Math.acos((bc * bc + ab * ab - ac * ac) / (2 * bc * ab));
    acos *= 180 / Math.PI;
    return acos;
}

// Check whether a bend is facing up or down relative to the x-axis.
// Whenever the angle of a segment increases, it is oriented down, and whenever
// the angle decreases it is oriented up.
// TODO: might be wrong, needs more testing
function getOrientation(a, b, c) {
    let result = "";
    let prevAngle = getAngle(a, b);
    let currAngle = getAngle(b, c);

    if (prevAngle === currAngle) {
        result = "same";
    } else if (prevAngle < currAngle) {
        result = "down";
    } else {
        result = "up";
    }

    return result;
}