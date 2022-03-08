import './App.css';

import { Container, Row } from 'react-bootstrap';
import { useState } from 'react';

import Points from './points/Points';
import Canvas from './canvas/Canvas';

function App() {
  const [points, setPoints] = useState([]);

  return (
    <Container id="bender-container" className="mt-4">
      <h1 className="underline mb-3">Bender</h1>

      <Row>
        <Points
          points={points}
          setPoints={setPoints}
        />

        <Canvas points={points} />
      </Row>
    </Container>
  );
}

export default App;
