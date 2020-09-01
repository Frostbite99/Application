import React, {Component} from 'react';
import {Card, Form, Button, Col} from 'react-bootstrap';
import axios from "axios";
import {v4 as uuid} from "uuid";
import GeriDon from "./GeriDon";

export default class ModifiedAdd extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.etkinlikChange = this.etkinlikChange.bind(this);
        this.submitEtkinlik = this.submitEtkinlik.bind(this);
    }

    submitEtkinlik(event) {

        event.preventDefault();

        const etkinlik = {
            name: this.state.name,
            startdate: this.state.startdate,
            enddate: this.state.enddate,
            cap: this.state.cap,
            unique: uuid()
        };

        axios.post("/add",etkinlik)
            .then(response => {
                if(response != null){
                    this.setState(this.initialState);
                    alert("Başarıyla Eklendi.");
                    setTimeout(() => this.bookList(), 1000);

                }
            })
            .catch((error) => {
            console.error("Error - "+error);
            alert("1-Başlangıç Tarihi Bitiş Tarihinden Sonra Olamaz. \n" +
                "2-Başlangıç ve Bitiş Tarihleri Geçmiş Tarihler Olamaz \n" +
                "İsteğiniz gerçekleştirilemedi.");})



    }

    bookList = () => {
        return this.props.history.push("/list");
    };


        etkinlikChange(event)
        {
            this.setState({
                [event.target.name]:event.target.value
            });
        }

        initialState = {name:'', startdate:'', enddate:'', cap:'', unique:''};

        render()
        {
            return (
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        Etkinlik Ekle
                    </Card.Header>
                    <Form onSubmit={this.submitEtkinlik} id="EtkinlikFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Etkinlik Adı</Form.Label>
                                    <Form.Control required autocomplete="off"
                                                  type="text" name="name"
                                                  value={this.state.name}
                                                  onChange={this.etkinlikChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Etkinliğin Adı" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridStartDate">
                                    <Form.Label>Başlangıç Tarihi</Form.Label>
                                    <Form.Control required autocomplete="off"
                                                  type="date" name="startdate"
                                                  value={this.state.startdate}
                                                  onChange={this.etkinlikChange}
                                                  className={"bg-dark text-white"}
                                                   />
                                    <Form.Text>
                                        Başlangıç Tarihi geçmiş bir tarih olmamalıdır.
                                    </Form.Text>

                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEndDate">
                                    <Form.Label>Bitiş Tarihi</Form.Label>
                                    <Form.Control required autocomplete="off"
                                                  type="date" name="enddate"
                                                  value={this.state.enddate}
                                                  onChange={this.etkinlikChange}
                                                  className={"bg-dark text-white"}
                                                   />
                                    <Form.Text>
                                        Bitiş Tarihi Başlangıç Tarihinden önce olmamalıdır.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCapacity">
                                    <Form.Label>Kapasite</Form.Label>
                                    <Form.Control required autocomplete="off"
                                                  type="text" name="cap"
                                                  value={this.state.cap}
                                                  onChange={this.etkinlikChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Etkinlik Kapasitesi" />
                                </Form.Group>
                            </Form.Row>

                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                Kaydet
                            </Button>
                            <GeriDon></GeriDon>
                        </Card.Footer>
                    </Form>
                </Card>
            );
        }
    }