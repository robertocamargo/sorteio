import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Candidate from './Component/Candidate';

// import { Container } from './styles';

function Main() {
  return (
    <Container>
      <Row>
        <Col />
        <Col xs={8}>
          <h1>Sorteio</h1>
        </Col>
        <Col />
      </Row>
      <Row>
        <Col />
        <Col xs={8}>
          <Candidate />
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Main;
