import React from "react";
import {Jumbotron,Container,Row,Col} from "react-bootstrap";

const marginTop = {
    marginTop:"20px"
};

class Cumbotron extends React.Component{


    render(){
        return(
            <Container>
                <Row>

                    <Col lg ={12} style={marginTop}>

                        <Jumbotron className="bg-dark text-white">
                            <h1>Hoşgeldiniz!</h1>
                            <p>
                                Lütfen yukarıdaki menüden yapmak istediğin işlemi seçiniz.
                            </p>
                        </Jumbotron>


                    </Col>


                </Row>




            </Container>
        );

}


}

export default Cumbotron;
