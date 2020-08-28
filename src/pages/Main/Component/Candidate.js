import React, { Component } from 'react';

import { Button, Form, Row,Alert,Fade } from 'react-bootstrap';
import Popup from './Popup';

export default class Candidate extends Component {
  state = {
    novosCandidatos: [],
    sorteados: [],
    total: '',
    ganhador: [],
    show: false,
    buttonSorteio: false,
    semCandidatos:false
  };

  componentDidMount() {
    const sorteados = localStorage.getItem('sorteados');
    const novosCandidatos = localStorage.getItem('novosCandidatos');
    if (sorteados) {
      this.setState({ sorteados: JSON.parse(sorteados) });
    }
    if (novosCandidatos) {
      this.setState({ novosCandidatos: JSON.parse(novosCandidatos) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { sorteados, novosCandidatos } = this.state;
    if (prevState.sorteados !== sorteados) {
      localStorage.setItem('sorteados', JSON.stringify(sorteados));
    }
    if (prevState.novosCandidatos !== novosCandidatos) {
      localStorage.setItem('novosCandidatos', JSON.stringify(novosCandidatos));
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * max) + min;
  }

  handleNovosCandidatos = (event) => {
    this.setState({
      novosCandidatos: event.target.value,
    });
  };

  nomesCandidados = (candidatos) => {
    return candidatos.split('\n');
  };

  manipularDadosSorteio = (candidatos) => {

    const nomes = this.nomesCandidados(candidatos);
    // Filtra apenas os nomes que não foram sorteados ainda
    const { sorteados } = this.state;
    const total = nomes.length;
    this.setState({
      total,
    });
    const nomesParaSorteio = nomes.filter((x) => !sorteados.includes(x));
    const totalSorteio = nomesParaSorteio.length - 1;


    const sorteio = this.getRandomInt(0, totalSorteio);

    this.ShowOpen();
    this.setState({
      sorteados: [...sorteados, nomesParaSorteio[sorteio]],
      ganhador: nomesParaSorteio[sorteio],
    });

    if (totalSorteio === 0) {
      this.setState({
        buttonSorteio:true
      });
      return;
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const candidatos = this.state.novosCandidatos;
    if(!candidatos){
      this.alertSemCandidatos();
      return;
    }

    this.manipularDadosSorteio(candidatos);
  };

  handleClear = () => {
    if (window.confirm('Limpar sorteio atual?')) {
      localStorage.removeItem('sorteados');
      localStorage.removeItem('novosCandidatos');
      this.setState({
        novosCandidatos: [],
        sorteados: [],
        total: '',
        ganhador: [],
        show: false,
        buttonSorteio: false
      });
    }
  };

  ShowOpen = () => this.setState({ show: true });

  alertSemCandidatos = () => {
    this.setState({
      semCandidatos: true
    });

    setTimeout(() => {
      this.setState({
        semCandidatos: false
      });
    }, 2000);

  }

  render() {
    const ShowClose = () => this.setState({ show: false });

    const { sorteados, novosCandidatos, total, ganhador, show, buttonSorteio,semCandidatos } = this.state;
    return (
      <>
       <Fade transition={semCandidatos}>
          <Alert variant="danger">Não existem mais candidatos para o sorterio </Alert>
      </Fade>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              as="textarea"
              rows="4"
              value={novosCandidatos}
              onChange={this.handleNovosCandidatos}
            />
            Total de candidatos {total}
            <Row />
            <Button disabled={buttonSorteio} variant="success" size="lg" block type="submit">
              Sortear
            </Button>
            <Row>.</Row>
            <Button
              variant="primary"
              size="lg"
              block
              onClick={this.handleClear}
            >
              Limpar sorteio
            </Button>
            <Row />
            <h2>Sorteados</h2>
            <ul className="list-group">
              {sorteados.map((sorts) => (
                <li className="list-group-item" key={sorts}>
                  {sorts}
                </li>
              ))}
            </ul>
          </Form.Group>
        </Form>
        <Popup show={show} ShowClose={ShowClose} ganhador={ganhador} />
      </>
    );
  }
}
