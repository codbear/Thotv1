import React, {useState} from "react";

import {BookForm} from "../../../book-form";
import {useQuery} from "react-query";
import apiFetcher from "../../../../services/apiFetcher";
import {Loader} from "../../../loader";

export default function BookFormContainer(props) {
    const {bookId} = props;
    const [formStatus, setFormStatus] = useState('loading');

    const fetchedBookFromId = useQuery(
        'fetchedBookFromId',
        () => apiFetcher('/api/books/' + bookId),
        {
            onSuccess: () => setFormStatus('success'),
        });

    const statusToContent = {
        loading: (
            <Loader visible light/>
        ),
        success: (
            <BookForm book={fetchedBookFromId.data}/>
        ),
    }

    return (
        <React.Fragment>
            {statusToContent[formStatus] || statusToContent.loading}
        </React.Fragment>
    )
}