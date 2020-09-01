import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom"
import NavigationBar from "./Components/NavigationBar";
import Welcome from "./Components/Welcome"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListEvent from "./Components/ListEvent";
import ModifiedAdd from "./Components/ModifiedAdd";
import UpdateEvent from "./Components/UpdateEvent";
import UserInterface from "./Components/UserInterface";
import Basvur from "./Components/Basvur";
import Login from "./Components/Login";
import BasvuranList from "./Components/BasvuranList";





function App() {

    return (
      <Router>
        <NavigationBar/>
          <Container>
              <Row>
                  <Col lg={12} className={"margin-top"}>

        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/user" exact component={UserInterface}/>
          <Route path="/basvur/:unique" exact component={Basvur}/>
          <Route path="/add" exact component={ModifiedAdd}/>
          <Route path="/list" exact component={ListEvent}/>
          <Route path="/update/:unique" exact component={UpdateEvent}/>
          <Route path="/basvuran/:unique" exact component={BasvuranList}/>


        </Switch>
                  </Col>
              </Row>
          </Container>


      </Router>
  );
}

export default App;
