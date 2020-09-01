import React,{Component} from "react";
import {Navbar, Nav,} from "react-bootstrap";
import {Link} from "react-router-dom";

class NavigationBar extends Component{

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Link to={""} className = "navbar-brand"> Etkinlik Yonetim</Link>

                    <Nav className="mr-auto">
                        <Link to={"list"} className ="nav-link">Kurumsal İşlemler</Link>
                        <Link to={"user"} className ="nav-link">Başvuru İşlemleri</Link>
                    </Nav>

            </Navbar>
        );
    }
}

export default NavigationBar;