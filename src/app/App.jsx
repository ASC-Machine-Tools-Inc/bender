import './App.css';

import { Container, Row } from 'react-bootstrap';
import { useState } from 'react';

import Points from './points/Points';
import Canvas from './canvas/Canvas';
import CanvasTest from './canvas/CanvasTest';

function App() {
  const [points, setPoints] = useState([]);

  const rotatePoints = (xScalar = 1, yScalar = 1) => {
    setPoints(points.map(([x, y]) => [y * yScalar, x * xScalar]));
  }

  const transformPoints = (xScalar = 1, yScalar = 1) => {
    setPoints(points.map(([x, y]) => [x * xScalar, y * yScalar]));
  }

  return (
    <Container id="bender-container" className="mt-4">
      <h1 className="underline mb-3">Bender</h1>

      <Row>
        <Points
          points={points}
          setPoints={setPoints}
        />

        <Canvas
          points={points}
          rotatePoints={rotatePoints}
          transformPoints={transformPoints}
        />
      </Row>

      <Row>
        <CanvasTest />
      </Row>
    </Container>
  );
}

export default App;
