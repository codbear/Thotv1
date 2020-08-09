import React, {useState} from "react";
import {Button, Col, Form, InputGroup} from "react-bootstrap";

import isbnChecker from "./services/isbnChecker";

export default function IsbnFetcherInput(props) {
    const {value, onFetch} = props;
    const [isbnInputValue, setIsbnInputValue] = useState(value);
    const [inputStatus, setInputStatus] = useState('waiting');
    const [invalidFeedbackMessage, setInvalidFeedbackMessage] = useState('');

    function onChange(event) {
        const newIsbnInputValue = event.target.value;
        setIsbnInputValue(newIsbnInputValue);
        setInputStatus(isbnChecker(newIsbnInputValue) ? 'valid' : 'invalid')
    }

    function onClick() {
        if (isbnInputValue === '') {
            setInvalidFeedbackMessage('Veuillez saisir un numéro ISBN.');
            return setInputStatus('invalid');
        }

        if (!isbnChecker(isbnInputValue)) {
            setInvalidFeedbackMessage('Le numéro ISBN n\'est pas valide.');
            return setInputStatus('invalid');
        }

        setInputStatus('valid');
        onFetch(isbnInputValue);
    }

    function getInputClassName() {
        return 'is-' + inputStatus;
    }

    return (
        <Col>
            <label htmlFor="book_isbn">ISBN</label>
            <InputGroup>
                <Form.Control
                    className={getInputClassName()}
                    id="book_isbn"
                    type="text"
                    value={isbnInputValue}
                    onChange={onChange}/>
                <InputGroup.Append>
                    <Button
                        id="isbnSearchBtn"
                        className="input-group-text"
                        onClick={onClick}>
                        <i className="fas fa-search"></i>
                    </Button>
                </InputGroup.Append>
                <div className="invalid-feedback">
                    {invalidFeedbackMessage}
                </div>
            </InputGroup>
        </Col>
    )
}