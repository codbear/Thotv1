import React from "react";
import {Alert, Button} from "react-bootstrap";

import './styles/bookMutationSuccessPopin.scss';

export default function BookMutationSuccessPopin(props) {
    const {message, onCreateOneMore, onClose} = props;

    const closeButton = (
        <Button
            onClick={onClose}
            variant="outline-dark">
            Fermer
        </Button>
    )

    const popinActions = onCreateOneMore ?
        (
            <React.Fragment>
                <Button
                    onClick={onCreateOneMore}
                    variant="outline-success">
                    Ajouter un nouveau livre
                </Button>
                {closeButton}
            </React.Fragment>
        )
        : closeButton;

    return (
        <div
            className="popin text-dark"
            aria-hidden="true" role="dialog"
            aria-labelledby="titleModal">
            <Alert
                className="popin-wrapper"
                variant="success">
                <div className="popin-content">
                    {message}
                </div>
                <div className="popin-action">
                    {popinActions}
                </div>
            </Alert>
        </div>
    )
}