import { useHistory } from "react-router-dom";
import React from "react";
import {Button} from 'react-bootstrap';
function GeriDon() {
    let history = useHistory();

    function handleClick() {
        history.push("/list");
    }

    return (
        <Button  size="sm" variant={"danger"} onClick={handleClick}>
            Vazgeç
        </Button>
    );
}

export default GeriDon;