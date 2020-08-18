import React from "react";
import {Col} from "react-bootstrap";

import CollectionsAutocompleteContainer from "../collections-autocomplete-container/CollectionsAutocompleteContainer";

import {Autocomplete} from "../../../autocomplete";

export default function CollectionsInput(props) {
    const {onMatch, publisher, onError} = props;

    let content;

    const isPublisherValid = (publisher.name && publisher.id);
    const isPublisherSelectedButNotValid = Boolean(publisher.name);

    if (isPublisherValid) {
        content = (
            <CollectionsAutocompleteContainer
                publisherId={publisher.id}
                onError={onError}
                onMatch={onMatch}/>
        )
    } else {
        let placeholder = isPublisherSelectedButNotValid ? "L'éditeur sélectionné n'est pas valide" : "Vous devez d'abord sélectionner un éditeur";
        content = (
            <Autocomplete
                label="Collection"
                name="book_collection"
                placeholder={placeholder}
                disabled
                isInvalid={isPublisherSelectedButNotValid}/>
        )
    }

    return (
        <Col>
            {content}
        </Col>);
}