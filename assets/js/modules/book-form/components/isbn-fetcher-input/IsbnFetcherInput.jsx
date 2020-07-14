import React, {useState} from "react";
import {Button, Col, Form, InputGroup} from "react-bootstrap";
import externalFetcher from "../../services/externalFetcher";

export default function IsbnFetcherInput(props) {
    const {value, onFetch} = props;
    const [isbnInputValue, setIsbnInputValue] = useState(value);

    async function onClick() {
        const bookDetails = await externalFetcher(isbnInputValue)
        onFetch(bookDetails);
    }

    return (
        <Col>
            <label htmlFor="book_isbn">ISBN</label>
            <InputGroup>
                <Form.Control
                    id="book_isbn"
                    type="text"
                    value={isbnInputValue}
                    onChange={(event) => setIsbnInputValue(event.target.value)}/>
                <InputGroup.Append>
                    <Button
                        id="isbnSearchBtn"
                        className="input-group-text"
                        onClick={onClick}>
                        <i className="fas fa-search"></i>
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </Col>
    )
}