import React, {useEffect, useReducer, useState} from 'react';
import {Col, Form, Row} from 'react-bootstrap';

import FormGroup from '../form-group/FormGroup';
import AutocompleteInput from '../autocomplete-input/AutocompleteInput';
import CollectionsInput from '../collections-input/CollectionsInput';
import SubmitButton from '../buttons/SubmitButton';
import IsbnFetcherInput from '../isbn-fetcher-input/IsbnFetcherInput';
import {Loader} from '../../../loader';
import {ErrorBox} from '../../../error-box';

import bookDetailsReducer from "../../reducers/bookDetailsReducer";

import './styles/bookForm.scss'

export default function BookForm(props) {
    const {book} = props;
    const [bookDetails, dispatchBookDetails] = useReducer(bookDetailsReducer, book);
    const [formStatus, setFormStatus] = useState('loading');
    const [errorMessage, setErrorMessage] = useState(undefined)
    const [isAuthorsInputInvalid, setIsAuthorsInputInvalid] = useState(true);
    const [isGenresInputInvalid, setIsGenresInputInvalid] = useState(true);
    const [isPublishersInputInvalid, setIsPublishersInputInvalid] = useState(true);

    function authorsInputDidMount() {
        setIsAuthorsInputInvalid(false);
    }

    function publishersInputDidMount() {
        setIsPublishersInputInvalid(false);
    }

    function genresInputDidMount() {
        setIsGenresInputInvalid(false);
    }

    function onSubmit() {

    }

    function onIsbnFetch(bookDetails) {
        console.log(bookDetails);
        dispatchBookDetails({type: 'externalFetch', payload: bookDetails})
    }

    function onAutocompleteInputError(error) {
        setFormStatus('error');
        setErrorMessage(error.message);
    }

    function onErrorBoxRetry() {
        setFormStatus('loading');
    }

    function onErrorBoxClose() {
        window.location = '/';
    }

    useEffect(() => {
        setFormStatus(isAuthorsInputInvalid ? 'loading'
            : isGenresInputInvalid ? 'loading'
                : isPublishersInputInvalid ? 'loading'
                    : 'success');
    }, [isAuthorsInputInvalid, isGenresInputInvalid, isPublishersInputInvalid, formStatus])

    const statusToContent = {
        error: (
            <ErrorBox
                message={errorMessage}
                onRetry={onErrorBoxRetry}
                onClose={onErrorBoxClose}/>
        ),
        default: (
            <React.Fragment>
                <Loader visible={formStatus !== 'success'} light/>
                <Form className={formStatus !== 'success' ? 'hidden' : ''}>
                    <Row>
                        <Col>
                            <Row>

                            </Row>
                            <Row>
                                <IsbnFetcherInput
                                    value={bookDetails.isbn}
                                    onFetch={onIsbnFetch}/>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <FormGroup
                                    name="book_title"
                                    label="Titre"
                                    type="text"
                                    value={bookDetails.title}/>
                            </Row>
                            <Row>
                                <AutocompleteInput
                                    resource="authors"
                                    onMatch={(author) => dispatchBookDetails({type: 'author', payload: author})}
                                    onError={onAutocompleteInputError}
                                    onMount={authorsInputDidMount}/>
                            </Row>
                            <Row>
                                <AutocompleteInput
                                    resource="genres"
                                    onMatch={(genre) => dispatchBookDetails({type: 'genre', payload: genre})}
                                    onError={onAutocompleteInputError}
                                    onMount={genresInputDidMount}/>
                            </Row>
                            <Row>
                                <AutocompleteInput
                                    resource="publishers"
                                    onMatch={(publisher) => dispatchBookDetails({
                                        type: 'publisher',
                                        payload: publisher
                                    })}
                                    onError={onAutocompleteInputError}
                                    onMount={publishersInputDidMount}/>
                            </Row>
                            <Row>
                                <CollectionsInput
                                    onMatch={(collection) => dispatchBookDetails({
                                        type: 'collection',
                                        payload: collection
                                    })}
                                    publisher={bookDetails.publisher}
                                    onError={onAutocompleteInputError}/>
                            </Row>
                            <Row>
                                <FormGroup
                                    name="book_volume"
                                    label="Tome"
                                    type="number"
                                    value={bookDetails.volume}/>
                                <FormGroup
                                    name="book_publication_year"
                                    label="Année de parution"
                                    type="number"
                                    value={bookDetails.publicationYear}/>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <FormGroup
                            name="book_description"
                            label="Description"
                            type="textarea"
                            value={bookDetails.description}/>
                    </Row>
                    <Row>
                        <FormGroup
                            name="book_observations"
                            label="Observations"
                            type="textarea"
                            value={bookDetails.observations}/>
                    </Row>
                    <Row>
                        <SubmitButton onSubmit={onSubmit}/>
                    </Row>
                </Form>
            </React.Fragment>
        ),
    }

    return (
        <React.Fragment>
            {statusToContent[formStatus] || statusToContent.default}
        </React.Fragment>
    )
}

BookForm.defaultProps = {
    book: {
        id: '',
        isbn: '',
        title: '',
        volume: '',
        author: {
            id: undefined,
            name: '',
        },
        publisher: {
            id: undefined,
            name: '',
        },
        publicationYear: '',
        collection: {
            id: undefined,
            name: '',
        },
        genre: {
            id: undefined,
            name: '',
        },
        description: '',
        format: {
            id: undefined,
            name: '',
        },
        isEbook: false,
        hasBeenRead: false,
        observations: '',
    }
}