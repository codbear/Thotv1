import React, {useEffect} from "react";
import {useMutation, useQuery} from "react-query";
import {Col} from "react-bootstrap";

import labelizer from "../../services/labelizer";
import apiFetcher from "../../../../services/apiFetcher";

import {Autocomplete} from "../../../autocomplete";

export default function AutocompleteInput(props) {
    const {resource, onMatch, onError, onMount} = props;

    const resourceUrl = '/api/' + resource;

    const {status, data, error} = useQuery(resource, () =>
        apiFetcher(resourceUrl)
    );

    useEffect(() => {
        if (error) {
            onError(error);
        }
    }, [error, onError])

    useEffect(() => {
        if (status === "success") {
            onMount();
        }
    }, [status, onMount])

    const [mutate] = useMutation(({value}) => {
        apiFetcher(resourceUrl, 'POST', {name: value})
    });

    async function createNewResource(value) {
        await mutate({value})
    }

    const statusToContent = {
        loading: (
            <Autocomplete
                label={labelizer(resource)}
                name={'book_' + resource}
                placeholder="Chargement..."
                disabled/>
        ),
        success: (
            <Autocomplete
                options={data}
                label={labelizer(resource)}
                name={'book_' + resource}
                onCreateNew={createNewResource}
                onMatch={onMatch}/>
        ),
        error: (
            <Autocomplete
                label={labelizer(resource)}
                name={'book_' + resource}
                placeholder="Erreur !"
                disabled/>
        ),
    }

    return (
        <Col>
            {statusToContent[status] || statusToContent.error}
        </Col>);
}