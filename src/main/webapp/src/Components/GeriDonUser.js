import { useHistory } from "react-router-dom";
import React from "react";
import {Button} from 'react-bootstrap';
function GeriDonUser() {
    let history = useHistory();

    function handleClick() {
        history.push("/user");
    }

    return (
        <Button  size="sm" variant={"danger"} onClick={handleClick}>
            Vazgeç
        </Button>
    );
}

export default GeriDonUser;