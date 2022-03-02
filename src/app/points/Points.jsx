import "./Points.css";

import { Col } from "react-bootstrap";

import PointsInput from "./PointsInput";
import PointsTable from "./PointsTable";

function Points(props) {
    return (
        <Col>
            <PointsInput
                points={props.points}
                setPoints={props.setPoints}
            />

            <PointsTable points={props.points} />
        </Col>
    );
}

export default Points;