import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Col, Form} from "react-bootstrap";
import GeriDonUser from "./GeriDonUser";
import QRCode from "qrcode.react";
import Row from "react-bootstrap/Row";

import Container from "react-bootstrap/Container";
import İsBitti from "./İsBitti";




export default class Basvur extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.userChange = this.userChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    submitUser(event) {

        event.preventDefault();

        const urll = window.location.pathname

        const kullanici = {
            ad: this.state.ad,
            soyad: this.state.soyad,
            tcKimlikNo: this.state.tcKimlikNo
        };

        axios.post(urll,kullanici)
            .then(response => {
                if(response != null){
                    this.setState({ad:'', soyad:'', tcKimlikNo:'',qr:response.data});
                    alert("Başarıyla Eklendi.");
                }
            })
            .catch((error) => {
                console.error("Error - "+error.message);
                alert("Kapasite dolu, veya aynı TCKimlikNo ile 2.defa başvurmaya çalışıyorsunuz!");})



    }

    bookList = () => {
        return this.props.history.push("/user");
    };

    userChange(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    initialState = {ad:'', soyad:'', tcKimlikNo:'',qr:''};

    render()
    {
        return (
            <div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    Basvur
                </Card.Header>
                <Form onSubmit={this.submitUser} id="EtkinlikFormId">
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Ad</Form.Label>
                                <Form.Control required autoComplete="off"
                                              type="text" name="ad"
                                              value={this.state.ad}
                                              onChange={this.userChange}
                                              className={"bg-dark text-white"}
                                              placeholder="Adınız" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridStartDate">
                                <Form.Label>Soyad</Form.Label>
                                <Form.Control required autoComplete="off"
                                              type="text" name="soyad"
                                              value={this.state.soyad}
                                              onChange={this.userChange}
                                              className={"bg-dark text-white"}
                                              placeholder="Soyadınız" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEndDate">
                                <Form.Label>Tc Kimlik Numarası</Form.Label>
                                <Form.Control required autoComplete="off"
                                              type="text" name="tcKimlikNo"
                                              value={this.state.tcKimlikNo}
                                              onChange={this.userChange}
                                              className={"bg-dark text-white"}
                                              placeholder="11 Haneli TC Kimlik Numaranız" />
                                <Form.Text>
                                   Aynı TC Kimlik No. ile bir etkinliğe birden çok başvuru yapamazsınız.
                                </Form.Text>
                            </Form.Group>

                        </Form.Row>

                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            Gönder
                        </Button>
                        <GeriDonUser></GeriDonUser>
                    </Card.Footer>
                </Form>
            </Card>

                <h6 align = "center" className={"text-white"}> Başvuru Bilgilerinizi İçeren QR Kod Aşağıdadır, Lütfen Kaydediniz.</h6>

                <Container>
                    <Row className="justify-content-md-center"><QRCode  value={this.state.qr} /></Row>
                    <Row>.</Row>
                    <Row className="justify-content-md-center" ><İsBitti/></Row>
                </Container>



            </div>



        );
    }
}