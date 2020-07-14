import React from "react";
import {Button} from "react-bootstrap";

export default function SubmitButton(props) {
    const {onSubmit} = props;
    return (
        <Button variant={"primary"} onClick={onSubmit}>
            Enregistrer
        </Button>
    )
}