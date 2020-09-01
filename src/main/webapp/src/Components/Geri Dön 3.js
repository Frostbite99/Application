import { useHistory } from "react-router-dom";
import React from "react";
import {Button} from 'react-bootstrap';
function GeriDon3() {
    let history = useHistory();

    function handleClick() {
        history.push("/");
    }

    return (
        <Button  size="sm" variant={"danger"} onClick={handleClick}>
            Ana Sayfaya Dön
        </Button>
    );
}

export default GeriDon3;