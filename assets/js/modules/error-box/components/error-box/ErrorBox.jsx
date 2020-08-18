import React from "react";
import PropTypes from "prop-types";

import './styles/errorBox.scss';
import {Button} from "react-bootstrap";

export default function ErrorBox(props) {
    const {message, canRetry, onRetry, onClose} = props;

    const closeButton = (
        <Button
            onClick={onClose}
            variant="dark">
            Fermer
        </Button>
    )

    const actionButtons = canRetry ?
        (
            <React.Fragment>
                <Button
                    onClick={onRetry}
                    variant="light">
                    Réessayer
                </Button>
                {closeButton}
            </React.Fragment>
        )
        : {closeButton};

    return (
        <div
            className="error-box text-dark"
            aria-hidden="true" role="dialog"
            aria-labelledby="titleModal">
            <div className="error-box-wrapper">
                <h1 className="error-box-header">Oups...</h1>
                <div className="error-box-content">
                    {message}
                </div>
                <div className="error-box-action">
                    {actionButtons}
                </div>
            </div>
        </div>
    )
}

ErrorBox.defaultProps = {
    message: 'Une erreur inattendue est survenue, merci de réessayer ultérieurement.',
    canRetry: true,
}

ErrorBox.propTypes = {
    message: PropTypes.string,
    canRetry: PropTypes.bool,
    onRetry: PropTypes.func,
    onClose: PropTypes.func.isRequired,
}