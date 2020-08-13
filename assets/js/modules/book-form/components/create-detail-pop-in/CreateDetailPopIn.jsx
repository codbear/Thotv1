/* Dependencies */
import React, {useEffect, useReducer} from "react";
import PropTypes from "prop-types";
import {Button, Col, Container, Row} from "react-bootstrap";

/* Modules */
import {Autocomplete} from "../../../autocomplete";

/* Hooks & Services */
import useCreateDetailsIfNeeded from "../../../sdk/hooks/useCreateDetailsIfNeeded";

/* Reducers */
import highLevelDetailsReducer from "../../reducers/highLevelDetailsReducer";

/* Styles */
import './styles/createDetailPopIn.scss';

export default function CreateDetailPopIn(props) {
    const {fetchedDetails, authorsIndex, genresIndex, publishersIndex, onCreate, onClose} = props;
    const [hldToCreate, dispatchHldToCreate] = useReducer(highLevelDetailsReducer, {
        author: fetchedDetails.author,
        publisher: fetchedDetails.publisher,
        genre: fetchedDetails.genre
    });

    const [createdDetails, createDetailsIfNeeded] = useCreateDetailsIfNeeded(authorsIndex, genresIndex, publishersIndex);

    const authorMustBeCreated = Boolean(hldToCreate.author);
    const genreMustBeCreated = Boolean(hldToCreate.genre);
    const publisherMustBeCreated = Boolean(hldToCreate.publisher);

    useEffect(() => {
        const shouldWaitForAuthorToBeCreated = authorMustBeCreated ? createdDetails.author === null : false;
        const shouldWaitForGenreToBeCreated = genreMustBeCreated ? createdDetails.genre === null : false;
        const shouldWaitForPublisherToBeCreated = publisherMustBeCreated ? createdDetails.publisher === null : false;
        const detailsSuccessfullyCreated = shouldWaitForAuthorToBeCreated === false && shouldWaitForGenreToBeCreated === false && shouldWaitForPublisherToBeCreated === false;
        if (detailsSuccessfullyCreated) {
            onCreate(createdDetails);
        }
    }, [onCreate, createdDetails, authorMustBeCreated, genreMustBeCreated, publisherMustBeCreated])

    function getBookDetailsDispatcherByType(actionType) {
        return (actionPayload) => {
            if (!actionPayload.name) {
                actionPayload = {
                    id: null,
                    name: actionPayload,
                }
            }
            dispatchHldToCreate({type: actionType, payload: actionPayload});
        }
    }

    function createDetails() {
        createDetailsIfNeeded(hldToCreate);
    }

    const authorNeedToBeReviewed = Boolean(fetchedDetails.author);
    const publisherNeedToBeReviewed = Boolean(fetchedDetails.publisher);
    const genreNeedToBeReviewed = Boolean(fetchedDetails.genre);
    const onlyAuthorNeedToBeReviewed = authorNeedToBeReviewed && publisherNeedToBeReviewed === false && genreNeedToBeReviewed === false;
    const onlyPublisherNeedToBeReviewed = authorNeedToBeReviewed === false && publisherNeedToBeReviewed && genreNeedToBeReviewed === false;
    const onlyGenreNeedToBeReviewed = authorNeedToBeReviewed === false && publisherNeedToBeReviewed === false && genreNeedToBeReviewed;

    let headerMessage = 'Des détails de ce livre n\'existent pas dans votre base de données et doivent d\'abord être créés.'
    let helperMessage = 'Saisissez du texte dans le champ d\'un détail ci-dessous pour le modifier ou pour rechercher une correspondance dans votre base de données.'

    if (onlyAuthorNeedToBeReviewed) {
        headerMessage = 'L\'auteur de ce livre n\'existe pas dans votre base de données et doit d\'abord être créé.';
        helperMessage = 'Vous pouvez modifier l\'auteur dans le champ ci-dessous ou rechercher une correspondance dans votre base de données.';
    }
    if (onlyPublisherNeedToBeReviewed) {
        headerMessage = 'L\'éditeur de ce livre n\'existe pas dans votre base de données et doit d\'abord être créé.';
        helperMessage = 'Vous pouvez modifier l\'éditeur dans le champ ci-dessous ou rechercher une correspondance dans votre base de données.';
    }
    if (onlyGenreNeedToBeReviewed) {
        headerMessage = 'Le genre de ce livre n\'existe pas dans votre base de données et doit d\'abord être créé.';
        helperMessage = 'Vous pouvez modifier le genre dans le champ ci-dessous ou rechercher une correspondance dans votre base de données.';
    }

    return (
        <div
            className="hld-popin text-dark"
            aria-hidden="true" role="dialog"
            aria-labelledby="titleModal">
            <div className="hld-popin-wrapper">
                <h1 className="hld-popin-header">
                    {headerMessage}
                </h1>
                <Container className="hld-popin-content">
                    <Row>
                        {helperMessage}
                    </Row>
                    <Row>
                        {(fetchedDetails.author) && (
                            <Col>
                                <Autocomplete
                                    label="Auteur"
                                    options={authorsIndex}
                                    value={fetchedDetails.author.name}
                                    onMatch={getBookDetailsDispatcherByType('setAuthor')}
                                    onChange={getBookDetailsDispatcherByType('setAuthor')}/>
                            </Col>
                        )}
                        {(fetchedDetails.publisher) && (
                            <Col>
                                <Autocomplete
                                    label="Éditeur"
                                    options={publishersIndex}
                                    value={fetchedDetails.publisher.name}
                                    onMatch={getBookDetailsDispatcherByType('setPublisher')}
                                    onChange={getBookDetailsDispatcherByType('setPublisher')}/>
                            </Col>
                        )}
                        {(fetchedDetails.genre) && (
                            <Col>
                                <Autocomplete
                                    label="Genre"
                                    options={genresIndex}
                                    value={fetchedDetails.genre.name}
                                    onMatch={getBookDetailsDispatcherByType('setGenre')}
                                    onChange={getBookDetailsDispatcherByType('setGenre')}/>
                            </Col>
                        )}
                    </Row>
                </Container>
                <div className="hld-popin-action">
                    <Button
                        onClick={onClose}
                        variant="light">
                        Fermer
                    </Button>
                    <Button
                        onClick={createDetails}
                        variant="dark">
                        Créer
                    </Button>
                </div>
            </div>
        </div>
    )
}

CreateDetailPopIn.defaultProps = {
    canRetry: true,
    onClose: () => {
    },
    onRetry: () => {
    },
}

CreateDetailPopIn.propTypes = {
    fetchedDetails: PropTypes.object.isRequired,
    authorsIndex: PropTypes.array.isRequired,
    genresIndex: PropTypes.array.isRequired,
    publishersIndex: PropTypes.array.isRequired,
}