import React from "react";
import {Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";

export default function FormGroup(props) {
    const {name, label, type, value, rows} = props;
    let formControl = (
        <Form.Control type={type} defaultValue={value}/>
    )

    if (type === 'textarea') {
        formControl = (
            <Form.Control as="textarea" rows={rows} defaultValue={value}/>
        )
    }

    return (
        <Col>
            <Form.Group controlId={name}>
                <Form.Label>{label}</Form.Label>
                {formControl}
            </Form.Group>
        </Col>
    )
}

FormGroup.defaultProps = {
    rows: '3'
}

FormGroup.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    rows: PropTypes.string,
}