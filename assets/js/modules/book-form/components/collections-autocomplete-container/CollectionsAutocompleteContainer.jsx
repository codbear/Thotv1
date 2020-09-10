import React from "react";
import {useMutation, useQuery} from "react-query";
import apiFetcher from "../../../../services/apiFetcher";
import {Autocomplete} from "../../../autocomplete";

export default function CollectionsAutocompleteContainer(props) {
    const {publisherId, onMatch, value, required} = props;
    const resourceUrl = '/api/publishers/' + publisherId + '/collections';

    const {status, data} = useQuery(publisherId && ['collections', publisherId], () =>
        apiFetcher(resourceUrl)
    );

    const [mutate] = useMutation(({value}) => {
        apiFetcher(resourceUrl, 'POST', {name: value})
    });

    async function createNewResource(value) {
        await mutate({value})
    }

    const statusToContent = {
        loading: (
            <Autocomplete
                label="Collection *"
                name="book_collection"
                placeholder="Chargement..."
                disabled
                required={required}/>
        ),
        success: (
            <Autocomplete
                options={data}
                label="Collection *"
                name="book_collection"
                value={value.name || ''}
                onCreateNew={createNewResource}
                onMatch={onMatch}
                required={required}/>
        ),
        error: (
            <Autocomplete
                label="Collection *"
                name="book_collection"
                placeholder="Erreur !"
                disabled
                required={required}/>
        ),
    }
    return statusToContent[status] || statusToContent.error;
}