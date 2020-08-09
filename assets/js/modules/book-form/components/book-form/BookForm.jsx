/* Dependencies */
import React, {useReducer, useState} from 'react';
import {useQuery} from 'react-query';
import {Col, Form, Row} from 'react-bootstrap';

/* Modules */
import {Loader} from '../../../loader';
import {ErrorBox} from '../../../error-box';
import FormGroup from '../form-group/FormGroup';
import AutocompleteInput from '../autocomplete-input/AutocompleteInput';
import CollectionsInput from '../collections-input/CollectionsInput';
import SubmitButton from '../buttons/SubmitButton';
import IsbnFetcherInput from '../isbn-fetcher-input/IsbnFetcherInput';
import CreateDetailPopIn from "../create-detail-pop-in/CreateDetailPopIn";

/* Hooks & Services */
import isbnFetcher from './services/isbnFetcher';
import apiFetcher from '../../../../services/apiFetcher';
import isMatching from "./services/isMatching";

/* Reducers */
import bookDetailsReducer from "./reducers/bookDetailsReducer";
import highLevelDetailsReducer from "../../reducers/highLevelDetailsReducer";

/* Styles */
import './styles/bookForm.scss'
import useCreateBook from "../../../sdk/hooks/useCreateBook";

export default function BookForm({book}) {
    const [bookDetails, dispatchBookDetails] = useReducer(bookDetailsReducer, book);
    const [formStatus, setFormStatus] = useState('loading');
    const [isbnToFetch, setIsbnToFetch] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [hldToCreate, dispatchHldToCreate] = useReducer(highLevelDetailsReducer, {
        author: undefined,
        genre: undefined,
        publisher: undefined
    });

    const createNewBook = useCreateBook();

    const highLevelDetailsQuery = useQuery('highLevelDetails', () =>
            Promise.all([
                apiFetcher('/api/authors'),
                apiFetcher('/api/genres'),
                apiFetcher('/api/publishers'),
                apiFetcher('/api/formats'),
            ]), {
            onSuccess: () => {
                setFormStatus('success')
            },
            onError: (error) => {
                setFormStatus('error');
                setMessage(error.message);
            },
            refetchOnWindowFocus: false,
            retry: 2,
        }
    );

    const [
        authorsIndex = [],
        genresIndex = [],
        publishersIndex = [],
        formatsIndex = []
    ] = highLevelDetailsQuery.data || [];

    function reloadForm() {
        setFormStatus('loading');
    }

    function goBackHome() {
        window.location = '/';
    }

    function onSubmit() {
        console.log(bookDetails);
        createNewBook(bookDetails);
    }

    async function onIsbnFetch(isbn) {
        setFormStatus('loading');
        setIsbnToFetch(isbn);
        try {
            let bookDetails = await isbnFetcher(isbn);

            if (bookDetails.title === null) {
                throw new Error('Aucun résultat disponible pour le numéro ISBN fourni.');
            }

            const {author, publisher, genre} = bookDetails;

            const authorInDb = author.name
                ? authorsIndex.find(isMatching(author))
                : undefined;
            const publisherInDb = publisher.name
                ? publishersIndex.find(isMatching(publisher))
                : undefined;
            const genreInDb = genre.name
                ? genresIndex.find(isMatching(genre))
                : undefined;

            bookDetails.author = authorInDb ?? author;
            bookDetails.publisher = publisherInDb ?? publisher;
            bookDetails.genre = genreInDb ?? genre;

            dispatchBookDetails({type: 'setBookDetails', payload: bookDetails});
            dispatchBookDetails({type: 'setIsbn', payload: isbn});

            const shouldReviewAuthor = bookDetails.author.name !== null && bookDetails.author.id === null;
            const shouldReviewPublisher = bookDetails.publisher.name !== null && bookDetails.publisher.id === null;
            const shouldReviewGenre = bookDetails.genre.name !== null && bookDetails.genre.id === null;
            const shouldReviewDetails = shouldReviewAuthor || shouldReviewPublisher || shouldReviewGenre;

            if (shouldReviewDetails) {
                if (shouldReviewAuthor) {
                    dispatchHldToCreate({type: 'setAuthor', payload: author});
                }
                if (shouldReviewPublisher) {
                    dispatchHldToCreate({type: 'setPublisher', payload: publisher});
                }
                if (shouldReviewGenre) {
                    dispatchHldToCreate({type: 'setGenre', payload: genre});
                }
                return setFormStatus('hldCreation');
            }

            return setFormStatus('success');
        } catch (e) {
            setMessage(e.message);
            setFormStatus('isbnError');
        }
    }

    function fetchIsbnAgain() {
        onIsbnFetch(isbnToFetch);
    }

    function onHldCreation(createdDetails) {
        const {author, publisher, genre} = createdDetails;
        if (author) {
            dispatchBookDetails({type: 'setAuthor', payload: author});
        }
        if (publisher) {
            dispatchBookDetails({type: 'setPublisher', payload: publisher});
        }
        if (genre) {
            dispatchBookDetails({type: 'setGenre', payload: genre});
        }
        return setFormStatus('success');
    }

    const statusToContent = {
        isbnError: (
            <ErrorBox
                message={message}
                onRetry={fetchIsbnAgain}
                onClose={reloadForm}/>
        ),
        hldCreation: (
            <CreateDetailPopIn
                authorsIndex={authorsIndex}
                genresIndex={genresIndex}
                publishersIndex={publishersIndex}
                fetchedDetails={hldToCreate}
                onCreate={onHldCreation}
                onClose={() => setFormStatus('success')}/>
        ),
        error: (
            <ErrorBox
                message={message}
                onRetry={reloadForm}
                onClose={goBackHome}/>
        ),
        loading: (
            <Loader visible light/>
        ),
        success: (
            <React.Fragment>
                <Form>
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
                                    detailName="authors"
                                    options={authorsIndex}
                                    value={bookDetails.author}
                                    onMatch={(author) => dispatchBookDetails({type: 'setAuthor', payload: author})}/>
                            </Row>
                            <Row>
                                <AutocompleteInput
                                    detailName="genres"
                                    options={genresIndex}
                                    value={bookDetails.genre}
                                    onMatch={(genre) => dispatchBookDetails({type: 'setGenre', payload: genre})}/>
                            </Row>
                            <Row>
                                <AutocompleteInput
                                    detailName="publishers"
                                    options={publishersIndex}
                                    value={bookDetails.publisher}
                                    onMatch={(publisher) => dispatchBookDetails({
                                        type: 'setPublisher',
                                        payload: publisher
                                    })}/>
                            </Row>
                            <Row>
                                <CollectionsInput
                                    value={bookDetails.collection}
                                    onMatch={(collection) => dispatchBookDetails({
                                        type: 'setCollection',
                                        payload: collection
                                    })}
                                    publisher={bookDetails.publisher}/>
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
                            <Row>
                                <AutocompleteInput
                                    detailName="formats"
                                    options={formatsIndex}
                                    value={bookDetails.format}
                                    onMatch={(format) => dispatchBookDetails({type: 'setFormat', payload: format})}/>
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
            {statusToContent[formStatus] || statusToContent.loading}
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