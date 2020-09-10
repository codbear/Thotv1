import React, {useState} from "react";
import {useQuery} from "react-query";
import apiFetcher from "../../../../services/apiFetcher";
import {Autocomplete} from "../../../autocomplete";
import useCreateDetailByUrl from "../../../sdk/hooks/useCreateDetailByUrl";

export default function CollectionsAutocompleteContainer(props) {
    const {publisherId, onMatch, value, requiredFieldLocker} = props;
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const resourceUrl = '/api/publishers/' + publisherId + '/collections';

    const collectionQuery = useQuery(
        publisherId && ['collections', publisherId],
        () => apiFetcher(resourceUrl),
        {
            onSuccess: (data) => setAutocompleteOptions(data),
        }
    );

    const createNewResource = useCreateDetailByUrl(resourceUrl);

    async function onCreateNew(inputValue) {
        const createdRessource = await createNewResource(inputValue);
        collectionQuery.data.push(createdRessource);
        onMatch(createdRessource);
        setAutocompleteOptions(collectionQuery.data);
    }

    const statusToContent = {
        loading: (
            <Autocomplete
                label="Collection *"
                name="book_collection"
                placeholder="Chargement..."
                disabled
                required={requiredFieldLocker}/>
        ),
        success: (
            <Autocomplete
                options={autocompleteOptions}
                label="Collection *"
                name="book_collection"
                value={value.name || ''}
                onCreateNew={onCreateNew}
                onMatch={onMatch}/>
        ),
        error: (
            <Autocomplete
                label="Collection *"
                name="book_collection"
                placeholder="Erreur !"
                disabled/>
        ),
    }
    return statusToContent[collectionQuery.status] || statusToContent.error;
}