import { useHistory } from "react-router-dom";
import React from "react";
import {Button} from 'react-bootstrap';
function GeriDon2() {
    let history = useHistory();

    function handleClick() {
        history.push("/list");
    }

    return (
        <Button  size="sm" variant={"danger"} onClick={handleClick}>
            Listeye Dön
        </Button>
    );
}

export default GeriDon2;