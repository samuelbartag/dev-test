import React from 'react';
import axios from 'axios';

import * as log from 'loglevel';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import {
  Modal,
  ButtonGroup,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import MaskedFormControl from 'react-bootstrap-maskedinput'

import '../assets/scss/_bootstrap.scss';
import '../assets/scss/react-bootstrap-table2-paginator.scss';
import '../assets/scss/react-confirm-alert.scss';

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.handleLoad = this.handleLoad.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.addParticipant = this.addParticipant.bind(this);
    this.rmvParticipant = this.rmvParticipant.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleTitle = this.handleTitle.bind(this);

    this.state = {
      events: [],
      form: {
        id: null,
        event: null,
        place: null,
        date: null,
        time: null,
        participants: [],
        participantInput: null,
      },
      showModal: false,
      selected: [],
      feedback: null,
    };
  }

  componentDidMount () {
    this.handleLoad();
  }

  onRowSelect({ id }, isSelected) {
    if (isSelected) {
      this.setState({
        selected: [...this.state.selected, id].sort(),
      });
    } else {
      this.setState({ selected: this.state.selected.filter(it => it !== id) });
    }
  }

  handleLoad() {
    axios
      .get('https://localhost:8090/app_dev.php/api/event')
      .then((res) => {
        this.setState(() => {
          return {
            events: res.data,
          };
        });
      })
      .catch(err => log.warn(err));

    return false;
  }

  confirmDelete() {
    confirmAlert({
      title: 'Exclusão',
      message: 'Deseja apagar esses registros?',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: () => this.handleDelete(),
    });
  }

  addParticipant() {
    log.warn(this.state.form);
    this.setState({
      form: {
        ...this.state.form,
        participants: [...this.state.form.participants, this.state.form.participantInput],
        participantInput: '',
      },
    });
    log.warn(this.state.form);
  }

  rmvParticipant(id) {
    log.warn(this.state.form.participants);

    this.setState({
      form: {
        ...this.state.form,
        participants: this.state.form.participants.splice(id, 1),
      },
    });

    log.warn(this.state.form.participants);
  }

  handleClose() {
    this.setState({ showModal: false });
    this.handleClear();
  }

  handleShow() {
    this.setState({
      showModal: true,
      feedback: null,
    });
  }

  handleEdit() {
    axios
      .get(`https://localhost:8090/app_dev.php/api/event/${this.state.selected[0]}`)
      .then((res) => {
        this.setState({
          form: res.data,
        });

        this.handleShow();
      })
      .catch(err => log.warn(err));
  }

  handleDelete() {
    this.state.selected.map((selectedItem) => {
      axios
        .delete(`https://localhost:8090/app_dev.php/api/event/${selectedItem}`)
        .catch(err => log.warn(err));

      return true;
    });

    this.handleLoad();
  }

  handleSave() {
    this.setState({
      feedback: 'enviando...',
    });

    if (this.state.form.id) {
      const url = `https://localhost:8090/app_dev.php/api/event/${this.state.form.id}`;

      axios
        .put(url, this.state.form)
        .then(() => {
          this.handleClear();
          this.handleLoad();
          this.setState({
            showModal: false,
            feedback: null,
          });
        })
        .catch((err) => {
          log.warn(err);
          this.setState({
            feedback: 'ocorreu um erro, tente novamente!',
          });
        });
    } else {
      const url = 'https://localhost:8090/app_dev.php/api/event';

      axios
        .post(url, this.state.form)
        .then(() => {
          this.handleClear();
          this.handleLoad();
          this.setState({
            showModal: false,
            feedback: null,
          });
        })
        .catch((err) => {
          log.warn(err);
          this.setState({
            feedback: 'ocorreu um erro, tente novamente!',
          });
        });
    }
  }

  handleChange(event) {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleClear() {
    this.setState({
      form: {
        id: null,
        event: null,
        place: null,
        date: null,
        time: null,
        participants: [],
        participantInput: null,
      },
    });
  }

  handleTitle() {
    return this.state.form.id ? `# ${this.state.form.id}` : 'novo';
  }

  render () {
    const columns = [{
      dataField: 'id',
      text: 'ID',
      columnWidth: '60px',
    }, {
      dataField: 'event',
      text: 'Evento',
      sort: true,
    }, {
      dataField: 'place',
      text: 'Local',
      sort: true,
    }, {
      dataField: 'date',
      text: 'Data',
      sort: true,
    }, {
      dataField: 'time',
      text: 'Hora',
    }, {
      dataField: 'participants',
      text: 'Participantes',
    }];

    const selectRowProp = {
      mode: 'checkbox',
      columnWidth: '60px',
      clickToSelect: true,
      hideSelectColumn: true,
      onSelect: this.onRowSelect,
      selected: this.state.selected,
      bgColor: '#FAFAFA',
    };

    return (
      <div>
        <Grid>
          <Row>
            <h3>
              Eventos
              <ButtonGroup className="pull-right">
                <Button
                  className="btn btn-success"
                  onClick={this.handleShow}
                >
                  <i className="glyphicon glyphicon-plus" />
                </Button>
                <Button
                  className="btn btn-warning"
                  onClick={this.handleEdit}
                  disabled={!this.state.selected.length || this.state.selected.length !== 1}
                >
                  <i className="glyphicon glyphicon-pencil" />
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={this.confirmDelete}
                  disabled={!this.state.selected.length}
                >
                  <i className="glyphicon glyphicon-minus" />
                </Button>
              </ButtonGroup>
            </h3>
          </Row>
          <Row>
            <BootstrapTable
              keyField="id"
              data={this.state.events}
              columns={columns}
              pagination={paginationFactory()}
              selectRow={selectRowProp}
            />
          </Row>
        </Grid>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <form>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.form.id ? `Edição ${this.state.form.id}` : 'Cadastro'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Grid>
                <Row>
                  <Col xs={8}>
                    <Row>
                      <Col xs={12}>
                        <FormGroup controlId="event" >
                          <ControlLabel>Evento</ControlLabel>
                          <FormControl
                            name="event"
                            type="text"
                            value={this.state.form.event}
                            placeholder="Evento"
                            onChange={this.handleChange}
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <FormGroup controlId="place" >
                          <ControlLabel>Local</ControlLabel>
                          <FormControl
                            name="place"
                            type="text"
                            value={this.state.form.place}
                            placeholder="Local"
                            onChange={this.handleChange}
                          />
                          <FormControl.Feedback />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={6}>
                        <FormGroup controlId="date" >
                          <ControlLabel>Data</ControlLabel>
                          <MaskedFormControl
                            name="date"
                            type="text"
                            mask="1111-11-11"
                            value={this.state.form.date}
                            placeholder="aaaa-mm-dd"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>

                      <Col xs={6}>
                        <FormGroup controlId="time" >
                          <ControlLabel>Hora</ControlLabel>
                          <MaskedFormControl
                            name="time"
                            type="text"
                            mask="11:11"
                            value={this.state.form.time}
                            placeholder="hh:mm"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={4}>
                    <Row>
                      <Col xs={12}>
                        <FormGroup controlId="formBasicText" >
                          <ControlLabel>Participantes</ControlLabel>
                          <InputGroup>
                            <FormControl
                              value={this.state.form.participantInput}
                              name="participantInput"
                              type="text"
                              placeholder="Participante"
                              onChange={this.handleChange}
                            />
                            <InputGroup.Button>
                              <Button className="btn" onClick={this.addParticipant} ><i className="glyphicon glyphicon-plus" /></Button>
                            </InputGroup.Button>
                          </InputGroup>
                          <ListGroup componentClass="ul">
                            {this.state.form.participants.map((participant, idx) => (
                              <ListGroupItem
                                obj={participant}
                                id={idx}
                                onClick={() => this.rmvParticipant(idx)}
                              >
                                {participant}
                              </ListGroupItem>
                              ))}
                          </ListGroup>
                        </FormGroup>
                      </Col>
                    </Row>

                  </Col>
                </Row>

              </Grid>

            </Modal.Body>
            <Modal.Footer>
              <div className="pull-left" id="feedback">{this.state.feedback}</div>
              <Button onClick={this.handleSave}>Salvar</Button>
            </Modal.Footer>
          </form>
        </Modal>

      </div>
    );
  }
}
