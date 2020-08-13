/* Dependencies */
import React, {useReducer, useState} from 'react';
import {useQuery} from 'react-query';
import {Col, Form, Image, Row} from 'react-bootstrap';

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
import useCreateBook from "../../../sdk/hooks/useCreateBook";

/* Reducers */
import bookDetailsReducer from "./reducers/bookDetailsReducer";
import highLevelDetailsReducer from "../../reducers/highLevelDetailsReducer";

/* Styles */
import './styles/bookForm.scss'
import BookCreationSuccessPopin from "../book-creation-success-popin/BookCreationSuccessPopin";
import useUpdateBook from "../../../sdk/hooks/useUpdateBook";

export default function BookForm({book}) {
    const [formStatus, setFormStatus] = useState('loading');
    const [isbnToFetch, setIsbnToFetch] = useState(undefined);
    const [message, setMessage] = useState(undefined);
    const [hldToCreate, dispatchHldToCreate] = useReducer(highLevelDetailsReducer, {
        author: undefined,
        genre: undefined,
        publisher: undefined
    });
    const [bookDetails, dispatchBookDetails] = useReducer(bookDetailsReducer, book);

    function getBookDetailsDispatcherForAction(actionType) {
        return (payload) => dispatchBookDetails({type: actionType, payload: payload});
    }

    const createNewBook = useCreateBook();
    const updateBook = useUpdateBook();

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

    function resetForm() {
        window.location = '/book/new';
    }

    function goBackHome() {
        window.location = '/';
    }

    async function onSubmit() {
        try {
            let mutateBook;
            if (bookDetails.id) {
                mutateBook = await updateBook(bookDetails);
            } else {
                mutateBook = await createNewBook(bookDetails);
            }

            if (!mutateBook.id) {
                throw new Error('Une erreur est survenue lors de l\'ajout du livre, veuillez réessayer');
            }

            setMessage('Le livre a été ajouté à votre bibliothèque. Que voulez-vous faire maintenant ?');
            return setFormStatus('bookSuccessfullyCreated');
        } catch (e) {
            setMessage(e.message || 'Une erreur est survenue lors de l\'enregistrement en base de données, veuillez réessayer');
            setFormStatus('bookCreationError');
        }
    }

    async function onIsbnFetch(isbn) {
        setFormStatus('loading');
        setIsbnToFetch(isbn);
        try {
            let fetchedDetails = await isbnFetcher(isbn);

            console.log(fetchedDetails);

            if (fetchedDetails.title === null) {
                throw new Error('Aucun résultat disponible pour le numéro ISBN fourni.');
            }

            dispatchBookDetails({type: 'setIsbn', payload: isbn});
            dispatchBookDetails({type: 'setTitle', payload: fetchedDetails.title});

            if (fetchedDetails.description !== null) {
                dispatchBookDetails({type: 'setDescription', payload: fetchedDetails.description});
            }

            if (fetchedDetails.publication_year !== null) {
                dispatchBookDetails({type: 'setPublicationYear', payload: fetchedDetails.publication_year});
            }

            const {author, publisher, genre} = fetchedDetails;

            const authorInDb = author.name
                ? authorsIndex.find(isMatching(author))
                : undefined;
            const publisherInDb = publisher.name
                ? publishersIndex.find(isMatching(publisher))
                : undefined;
            const genreInDb = genre.name
                ? genresIndex.find(isMatching(genre))
                : undefined;

            fetchedDetails.author = authorInDb ?? author;
            fetchedDetails.publisher = publisherInDb ?? publisher;
            fetchedDetails.genre = genreInDb ?? genre;

            dispatchBookDetails({type: 'setAuthor', payload: fetchedDetails.author});
            dispatchBookDetails({type: 'setPublisher', payload: fetchedDetails.publisher});
            dispatchBookDetails({type: 'setGenre', payload: fetchedDetails.genre});

            const shouldReviewAuthor = fetchedDetails.author.name !== null && fetchedDetails.author.id === null;
            const shouldReviewPublisher = fetchedDetails.publisher.name !== null && fetchedDetails.publisher.id === null;
            const shouldReviewGenre = fetchedDetails.genre.name !== null && fetchedDetails.genre.id === null;
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

    let bookCoverImageSrc = '/img/book_cover_placeholder.png'
    if (bookDetails.isbn) {
        bookCoverImageSrc = "https://pictures.abebooks.com/isbn/" + bookDetails.isbn + "-us-300.jpg"
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
        bookCreationError: (
            <ErrorBox
                message={message}
                onRetry={onSubmit}
                onClose={reloadForm}/>
        ),
        bookSuccessfullyCreated: (
            <BookCreationSuccessPopin
                message={message}
                onCreateOneMore={resetForm}
                onClose={goBackHome}/>
        ),
        loading: (
            <Loader visible light/>
        ),
        success: (
            <React.Fragment>
                <Form>
                    <Row>
                        <Col lg={4} id="book-cover-container">
                            <Image src={bookCoverImageSrc} rounded/>
                        </Col>
                        <Col lg={{span: 7, offset: 5}}>
                            <Row>
                                <IsbnFetcherInput
                                    value={bookDetails.isbn}
                                    onFetch={onIsbnFetch}
                                    onChange={getBookDetailsDispatcherForAction('setIsbn')}/>
                            </Row>
                            <Row>
                                <FormGroup
                                    name="book_title"
                                    label="Titre"
                                    type="text"
                                    value={bookDetails.title}
                                    onChange={getBookDetailsDispatcherForAction('setTitle')}/>
                            </Row>
                            <Row>
                                <AutocompleteInput
                                    detailName="authors"
                                    options={authorsIndex}
                                    value={bookDetails.author}
                                    onMatch={getBookDetailsDispatcherForAction('setAuthor')}/>
                            </Row>
                            <Row>
                                <AutocompleteInput
                                    detailName="genres"
                                    options={genresIndex}
                                    value={bookDetails.genre}
                                    onMatch={getBookDetailsDispatcherForAction('setGenre')}/>
                            </Row>
                            <Row>
                                <AutocompleteInput
                                    detailName="publishers"
                                    options={publishersIndex}
                                    value={bookDetails.publisher}
                                    onMatch={getBookDetailsDispatcherForAction('setPublisher')}/>
                            </Row>
                            <Row>
                                <CollectionsInput
                                    value={bookDetails.collection}
                                    onMatch={getBookDetailsDispatcherForAction('setCollection')}
                                    publisher={bookDetails.publisher}/>
                            </Row>
                            <Row>
                                <FormGroup
                                    name="book_volume"
                                    label="Tome"
                                    type="number"
                                    value={bookDetails.volume}
                                    onChange={getBookDetailsDispatcherForAction('setVolume')}/>
                                <FormGroup
                                    name="book_publication_year"
                                    label="Année de parution"
                                    type="number"
                                    value={bookDetails.publication_year}
                                    onChange={getBookDetailsDispatcherForAction('setPublicationYear')}/>
                            </Row>
                            <Row>
                                <AutocompleteInput
                                    detailName="formats"
                                    options={formatsIndex}
                                    value={bookDetails.format}
                                    onMatch={getBookDetailsDispatcherForAction('setFormat')}/>
                            </Row>
                            <Row>
                                <FormGroup
                                    name="book_description"
                                    label="Description"
                                    type="textarea"
                                    value={bookDetails.description}
                                    onChange={getBookDetailsDispatcherForAction('setDescription')}/>
                            </Row>
                            <Row>
                                <FormGroup
                                    name="book_observations"
                                    label="Observations"
                                    type="textarea"
                                    value={bookDetails.observations}
                                    onChange={getBookDetailsDispatcherForAction('setObservations')}/>
                            </Row>
                            <Row>
                                <SubmitButton onSubmit={onSubmit}/>
                            </Row>
                        </Col>
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
        publication_year: '',
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
        is_ebook: false,
        has_been_read: true,
        observations: '',
    }
}