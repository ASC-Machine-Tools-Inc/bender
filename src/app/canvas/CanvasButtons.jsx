import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonGroup, Button } from "react-bootstrap";
import { faArrowsLeftRight, faArrowsUpDown, faRotateLeft, faRotateRight } from "@fortawesome/free-solid-svg-icons";

function CanvasButtons(props) {
    return (
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
    );
}

export default CanvasButtons;