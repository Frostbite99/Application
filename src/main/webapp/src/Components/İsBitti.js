import { useHistory } from "react-router-dom";
import React from "react";
import {Button} from 'react-bootstrap';
function İsBitti() {
    let history = useHistory();

    function handleClick() {
        history.push("/user");
    }

    return (
        <Button  size="sm" variant={"light"} onClick={handleClick}>
            Listeye dön
        </Button>
    );
}

export default İsBitti;