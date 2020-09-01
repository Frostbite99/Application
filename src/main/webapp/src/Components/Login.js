import React, {Component} from 'react';
import {Button, Card, Col, Form} from "react-bootstrap";
import GeriDon3 from "./Geri Dön 3";
import axios from "axios";


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.formChange = this.formChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(event) {

        event.preventDefault();

        const cred = {
            kadı: this.state.kadı,
            sifre: this.state.sifre
        };

        axios.post("/login",cred)
            .then(response => {
                if(response.data === "OK!"){
                    this.setState(this.initialState);
                    setTimeout(() => this.bookList(), 1000);}
                    else{
                        alert("Buraya girmeye yetkiniz yok");
                        setTimeout(() => this.home(), 1000);
                    }


            })
            .catch((error) => {
                console.error("Error - "+error);
                alert("Buraya girmeye yetkiniz yok");})
                setTimeout(() => this.home(), 1000);



    }

    bookList = () => {
        return this.props.history.push("/list");
    };

    home = () =>{
        return this.props.history.push("/");
    }


    formChange(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    initialState = {kadı:'',sifre:''};

    render()
    {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    Giriş Yap
                </Card.Header>
                <Form onSubmit={this.submitForm} id="FormId">
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Kullanıcı Adı</Form.Label>
                                <Form.Control required autoComplete="off"
                                              type="text" name="kadı"
                                              value={this.state.kadı}
                                              onChange={this.formChange}
                                              className={"bg-dark text-white"}
                                              placeholder="Kullanıcı Adı" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridStartDate">
                                <Form.Label>Şifre</Form.Label>
                                <Form.Control required autoComplete="off"
                                              type="password" name="sifre"
                                              value={this.state.sifre}
                                              onChange={this.formChange}
                                              className={"bg-dark text-white"}
                                              placeholder="Şifre"
                                />

                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            Giriş Yap
                        </Button>
                        <GeriDon3></GeriDon3>
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}

export default Login;