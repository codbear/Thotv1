import React from "react";
import {Alert} from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';

import './styles/bookMutationSuccessPopin.scss';

export default function BookMutationSuccessPopin(props) {
    const {message, onClose} = props;

    return (
        <div
            className="popin text-dark"
            aria-hidden="true" role="dialog"
            aria-labelledby="titleModal">
            <Alert
                className="popin-wrapper"
                icon={<CheckIcon fontSize="inherit"/>}
                severity="success"
                variant="filled"
                onClose={onClose}>
                {message}
            </Alert>
        </div>
    )
}