import React, {useState} from "react";
import {Col} from "react-bootstrap";

import {Autocomplete} from "../../../autocomplete";

import labelizer from "../../services/labelizer";

import useCreateDetailByUrl from "../../../sdk/hooks/useCreateDetailByUrl";

export default function AutocompleteInput(props) {
    const {detailName, options, value, onMatch, requiredFieldLocker} = props;
    const [autocompleteOptions, setAutocompleteOptions] = useState(options);

    const createNewResource = useCreateDetailByUrl('/api/' + detailName);

    async function onCreateNew(inputValue) {
        const createdRessource = await createNewResource(inputValue);
        options.push(createdRessource);
        onMatch(createdRessource);
        setAutocompleteOptions(options);
    }

    return (
        <Col>
            <Autocomplete
                options={autocompleteOptions}
                label={labelizer(detailName) + ' *'}
                name={'book_' + detailName}
                value={value.name}
                onCreateNew={onCreateNew}
                onMatch={onMatch}
                requiredFieldLocker={requiredFieldLocker}/>
        </Col>
    );
}