import React, {useState} from "react";
import {Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";

export default function FormGroup(props) {
    const {name, label, type, value, rows, onChange} = props;
    const [inputValue, setInputValue] = useState(value);

    function handleChange(event) {
        const newInputValue = event.target.value;
        onChange(newInputValue);
        setInputValue(newInputValue);
    }

    let formControl = (
        <Form.Control
            type={type}
            value={inputValue}
            onChange={handleChange}/>
    )

    if (type === 'textarea') {
        formControl = (
            <Form.Control
                as="textarea"
                rows={rows}
                value={inputValue}
                onChange={handleChange}/>
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
    rows: PropTypes.string,
}