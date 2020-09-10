import React from "react";
import {Button} from "react-bootstrap";

export default function SubmitButton(props) {
    const {onSubmit, disabled} = props;
    return (
        <Button variant={"primary"} onClick={onSubmit} disabled={disabled}>
            Enregistrer
        </Button>
    )
}