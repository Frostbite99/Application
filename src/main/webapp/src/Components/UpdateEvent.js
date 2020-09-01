import React, {Component} from 'react';
import {Card, Form, Button, Col} from 'react-bootstrap';
import axios from "axios";
import GeriDon from "./GeriDon";

export default class ModifiedAdd extends Component {

    initialState = {name:'', startdate:'', enddate:'', cap:'', unique:''};

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.etkinlikChange = this.etkinlikChange.bind(this);

    }


    etkinlikChange(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    }



    componentDidMount() {
        const uniqueId = this.props.match.params.unique;
        if(uniqueId) {
            this.findEtkinlikByUniqueId(uniqueId);
        }
    }

    findEtkinlikByUniqueId = (uniqueId) => {
        axios.get("/update/"+uniqueId)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        name: response.data.name,
                        startdate: response.data.startdate,
                        enddate: response.data.enddate,
                        cap: response.data.cap,
                        unique:response.data.unique
                    });

                }
            }).catch((error) => {
            console.error("Error - "+error);
            alert("Bu etkinliğin başlangıç tarihi geçti, üstünde değişiklik yapamazsınız.");
        });
    };

    updateEtkinlik = event => {
        event.preventDefault();

        const etkinlik = {
            name: this.state.name,
            startdate: this.state.startdate,
            enddate: this.state.enddate,
            cap: this.state.cap,
            unique: this.state.unique
        };

        axios.put("/update/"+etkinlik.unique, etkinlik)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"put"});
                    alert("Başarıyla Güncellendi.")
                    setTimeout(() => this.setState({"show":false}), 3000);
                    setTimeout(() => this.bookList(), 1000);
                } else {
                    this.setState({"show":false});
                }
            }).catch(error => {
                alert("Bu etkinliğin başlangıç tarihi geçti, üstünde değişiklik yapamazsınız.");
                setTimeout(() => this.bookList(), 2000);

        });

        this.setState(this.initialState);
    };

    bookList = () => {
        return this.props.history.push("/list");
    };

    render()
    {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    Etkinliği Güncelle
                </Card.Header>
                <Form onSubmit={this.updateEtkinlik} id="bookFormId">
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
                                              placeholder="YYYY-AA-GG" />
                                <Form.Text>
                                    Yeni belirlediğiniz başlangıç tarihi geçmiş bir tarih olmamalıdır.
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
                                              placeholder="YYYY-AA-GG" />
                                <Form.Text>
                                    Yeni belirlediğiniz bitiş tarihi geçmiş bir tarih olmamalıdır.
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