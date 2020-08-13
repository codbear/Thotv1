import React from "react";
import {Col} from "react-bootstrap";

import {Autocomplete} from "../../../autocomplete";

import labelizer from "../../services/labelizer";

import useCreateDetailByUrl from "../../../sdk/hooks/useCreateDetailByUrl";

export default function AutocompleteInput(props) {
    const {detailName, options, value, onMatch} = props;

    const createNewResource = useCreateDetailByUrl('/api/' + detailName);

    return (
        <Col>
            <Autocomplete
                options={options}
                label={labelizer(detailName)}
                name={'book_' + detailName}
                value={value.name}
                onCreateNew={createNewResource}
                onMatch={onMatch}/>
        </Col>
    );
}