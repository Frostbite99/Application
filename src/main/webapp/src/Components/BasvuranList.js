import React, {Component} from 'react';
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import GeriDon2 from "./Geri Dön 2";

class BasvuranList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            basvuranlar:[]
        }
    }

    componentDidMount() {
        const urll = window.location.pathname
        this.basvuranlariListele(urll);
    }

    basvuranlariListele = (urlke) => {

        axios.get(urlke)
            .then(response =>response.data)
            .then((data) => {
                this.setState({basvuranlar:data})
            });
    }




    render() {
        return(
            <Card className="border border-dark bg-dark text-white">
                <Card.Header> Basvuran Listesi</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Basvuran Adı</th>
                            <th>Soyadı</th>
                            <th>Tc Kimlik No</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.basvuranlar.length === 0 ?
                                <tr align = "center">
                                    <td colSpan ="6"> Maalesef Hiç Basvuran Yok </td>

                                </tr> :
                                this.state.basvuranlar.map((basvuran) => (
                                    <tr key={basvuran.tcKimlikNo}>
                                        <td>{basvuran.ad}</td>
                                        <td>{basvuran.soyad}</td>
                                        <td>{basvuran.tcKimlikNo}</td>

                                    </tr>))
                        }

                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer style={{"textAlign":"right"}}>
                    <GeriDon2></GeriDon2>
                </Card.Footer>
            </Card>
        );
    }


}

export default BasvuranList;