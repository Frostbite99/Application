import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Link} from "react-router-dom";


export default class ListEvent extends Component{

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
        axios.get("/list")
            .then(response =>response.data)
            .then((data) => {
                this.setState({etkinlikler:data})
            });
    }

    deleteEtkinlik = (unique) =>{
        axios.delete("/delete" + unique)
            .then(response => {
               if(response.data != null){
                   alert("Başarıyla Silindi");
                   this.setState({
                       etkinlikler: this.state.etkinlikler.filter(etkinlik => etkinlik.unique !== unique)
                   });
               }
            }).catch(error => {alert("Bu etkinliğin başlangıç tarihi geçti, üzerinde değişiklik yapamazsınız.")});

    };



    render() {
        return(
            <Card className="border border-dark bg-dark text-white">
                <Card.Header> Etkinlik Listesi</Card.Header>
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
                                                <div className="btn-toolbar">
                                                <Link to={{ pathname: "https://www.google.com.tr/maps/search/"+etkinlik.name }} className="btn btn-sm btn-success"  target="_blank">Haritada Gör</Link>{' '}
                                                <Link to={"update/"+etkinlik.unique} className="btn btn-sm btn-primary">Düzenle</Link>{' '}
                                                <Button size="sm" variant="danger" onClick={this.deleteEtkinlik.bind(this, etkinlik.unique)}>Sil</Button>{'           '}
                                                    <Link to={"basvuran/"+etkinlik.unique} className="btn btn-sm btn-light">Başvuranları Gör</Link>{' '}
                                                </div>
                                            </ButtonGroup>
                                        </td>
                                    </tr>))
                        }

                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer style={{"textAlign":"right"}}>
                    <Link to={"add"} className="btn btn-sm btn-success">Yeni Etkinlik Ekle</Link>{' '}
                </Card.Footer>
            </Card>
        );
    }
}