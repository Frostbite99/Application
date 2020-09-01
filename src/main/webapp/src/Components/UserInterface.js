import React, {Component} from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class UserInterface extends Component{

    constructor(props) {
        super(props);
        this.state = {
            etkinlikler:[]
        }
    }

    componentDidMount() {
        this.etkinlikleriListele();
    }

    etkinlikleriListele(){
        axios.get("/user")
            .then(response =>response.data)
            .then((data) => {
                this.setState({etkinlikler:data})
            });
    }




    render() {
        return(
            <Card className="border border-dark bg-dark text-white">
                <Card.Header> Başvurulabilecek Etkinlikler</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Etkinlik Adı</th>
                            <th>Başlangıç Tarihi</th>
                            <th>Bitiş Tarihi</th>
                            <th>Eylemler</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.etkinlikler.length === 0 ?
                                <tr align = "center">
                                    <td colSpan ="6"> Maalesef Hiç Etkinlik Yok </td>

                                </tr> :
                                this.state.etkinlikler.map((etkinlik) => (
                                    <tr key={etkinlik.unique}>
                                        <td>{etkinlik.name}</td>
                                        <td>{etkinlik.startdate}</td>
                                        <td>{etkinlik.enddate}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={{ pathname: "https://www.google.com.tr/maps/search/"+etkinlik.name }} className="btn btn-sm btn-success"  target="_blank">Haritada Gör</Link>{' '}
                                                <Link to={"basvur/"+etkinlik.unique} className="btn btn-sm btn-primary">Başvur</Link>{' '}
                                            </ButtonGroup>
                                        </td>
                                    </tr>))
                        }

                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}