import React, {useState} from "react";
import PropTypes from "prop-types";

import {Button, Col, Container, Row} from "react-bootstrap";
import {Autocomplete} from "../../../autocomplete";

import './styles/createDetailPopIn.scss';
import useCreateDetailsIfNeeded from "../../../sdk/hooks/useCreateDetailsIfNeeded";

export default function CreateDetailPopIn(props) {
    const {fetchedDetails, authorsIndex, genresIndex, publishersIndex, onCreate, onClose} = props;
    const [hldToCreate, setHldToCreate] = useState({
        author: fetchedDetails.author,
        publisher: fetchedDetails.publisher,
        genre: fetchedDetails.genre
    });

    const createDetailsIfNeeded = useCreateDetailsIfNeeded(authorsIndex, genresIndex, publishersIndex);

    function createDetails() {
        createDetailsIfNeeded(hldToCreate);
        onCreate();
    }

    return (
        <div
            className="hld-popin text-dark"
            aria-hidden="true" role="dialog"
            aria-labelledby="titleModal">
            <div className="hld-popin-wrapper">
                <h1 className="hld-popin-header">
                    Des détails de ce livre n'existent pas dans votre base de données et doivent d'abord être créés.
                </h1>
                <Container className="hld-popin-content">
                    <Row>
                        Saisissez du texte dans le champ d'un détail ci-dessous pour le modifier ou pour rechercher une
                        correspondance dans votre base de données.
                    </Row>
                    <Row>
                        {(fetchedDetails.author.name) && (
                            <Col>
                                <Autocomplete
                                    label="Auteur"
                                    options={authorsIndex}
                                    value={fetchedDetails.author.name}
                                    onMatch={(matchingAuthor) => setHldToCreate({
                                        ...hldToCreate,
                                        author: matchingAuthor
                                    })}
                                    onChange={(inputValue) => setHldToCreate({
                                        ...hldToCreate,
                                        author: {id: undefined, name: inputValue}
                                    })}/>
                            </Col>
                        )}
                        {(fetchedDetails.publisher.name) && (
                            <Col>
                                <Autocomplete
                                    label="Éditeur"
                                    options={publishersIndex}
                                    value={fetchedDetails.publisher.name}
                                    onMatch={(matchingPublisher) => setHldToCreate({
                                        ...hldToCreate,
                                        publisher: matchingPublisher
                                    })}
                                    onChange={(inputValue) => setHldToCreate({
                                        ...hldToCreate,
                                        publisher: {id: undefined, name: inputValue}
                                    })}/>
                            </Col>
                        )}
                        {(fetchedDetails.genre.name) && (
                            <Col>
                                <Autocomplete
                                    label="Genre"
                                    options={genresIndex}
                                    value={fetchedDetails.genre.name}
                                    onMatch={(matchingGenre) => setHldToCreate({
                                        ...hldToCreate,
                                        genre: matchingGenre
                                    })}
                                    onChange={(inputValue) => setHldToCreate({
                                        ...hldToCreate,
                                        genre: {id: undefined, name: inputValue}
                                    })}/>
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