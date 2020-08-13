import React, {useEffect} from "react";
import {useMutation, useQuery} from "react-query";
import apiFetcher from "../../../../services/apiFetcher";
import {Autocomplete} from "../../../autocomplete";

export default function CollectionsAutocompleteContainer(props) {
    const {publisherId, onError, onMatch} = props;
    const resourceUrl = '/api/publishers/' + publisherId + '/collections';

    const {status, data, error} = useQuery(publisherId && ['collections', publisherId], () =>
        apiFetcher(resourceUrl)
    );

    useEffect(() => {
        if (error) {
            onError(error);
        }
    }, [error, onError])

    const [mutate] = useMutation(({value}) => {
        apiFetcher(resourceUrl, 'POST', {name: value})
    });

    async function createNewResource(value) {
        await mutate({value})
    }

    const statusToContent = {
        loading: (
            <Autocomplete
                label="Collection"
                name="book_collection"
                placeholder="Chargement..."
                disabled/>
        ),
        success: (
            <Autocomplete
                options={data}
                label="Collection"
                name="book_collection"
                onCreateNew={createNewResource}
                onMatch={onMatch}/>
        ),
        error: (
            <Autocomplete
                label="Collection"
                name="book_collection"
                placeholder="Erreur !"
                disabled/>
        ),
    }
    return statusToContent[status] || statusToContent.error;
}