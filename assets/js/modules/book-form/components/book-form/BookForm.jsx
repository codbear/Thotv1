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
    const [authorInputIsValid, setAuthorInputIsValid] = useState(false);
    const [genreInputIsValid, setPublisherInputIsValid] = useState(false);
    const [publisherInputIsValid, setGenreInputIsValid] = useState(false);

    function authorInputDidMount() {
        setAuthorInputIsValid(true);
    }

    function publisherInputDidMount() {
        setPublisherInputIsValid(true);
    }

    function genreInputDidMount() {
        setGenreInputIsValid(true);
    }

    useEffect(() => {
        let newStatus = 'loading'
        if (authorInputIsValid) {
            if (genreInputIsValid) {
                if (publisherInputIsValid) {
                    newStatus = 'success';
                }
            }
        }
        if (formStatus !== 'error') {
            setFormStatus(newStatus);
        }
    }, [authorInputIsValid, genreInputIsValid, publisherInputIsValid, formStatus])

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

    function onSubmit() {

    }

    function onIsbnFetch(bookDetails) {
        dispatchBookDetails({type: 'setBookDetails', payload: bookDetails})
    }

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
                                    onMatch={(author) => dispatchBookDetails({type: 'setAuthor', payload: author})}
                                    onError={onAutocompleteInputError}
                                    onMount={authorInputDidMount}/>
                            </Row>
                            <Row>
                                <AutocompleteInput
                                    resource="genres"
                                    onMatch={(genre) => dispatchBookDetails({type: 'setGenre', payload: genre})}
                                    onError={onAutocompleteInputError}
                                    onMount={genreInputDidMount}/>
                            </Row>
                            <Row>
                                <AutocompleteInput
                                    resource="publishers"
                                    onMatch={(publisher) => dispatchBookDetails({
                                        type: 'setPublisher',
                                        payload: publisher
                                    })}
                                    onError={onAutocompleteInputError}
                                    onMount={publisherInputDidMount}/>
                            </Row>
                            <Row>
                                <CollectionsInput
                                    onMatch={(collection) => dispatchBookDetails({
                                        type: 'setCollection',
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