import React from "react";

import './styles/bookCreationSuccessPopin.scss';
import {Button} from "react-bootstrap";

export default function BookCreationSuccessPopin(props) {
    const {message, onCreateOneMore, onClose} = props;

    return (
        <div
            className="error-box text-dark"
            aria-hidden="true" role="dialog"
            aria-labelledby="titleModal">
            <div className="error-box-wrapper">
                <div className="error-box-content">
                    {message}
                </div>
                <div className="error-box-action">
                    <Button
                        onClick={onCreateOneMore}
                        variant="light">
                        Ajouter un nouveau livre
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="dark">
                        Fermer
                    </Button>
                </div>
            </div>
        </div>
    )
}