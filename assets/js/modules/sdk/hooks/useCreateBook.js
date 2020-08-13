import {useMutation} from "react-query";
import apiFetcher from "../../../services/apiFetcher";

export default function useCreateBook(method = 'POST') {
    const [mutate] = useMutation(({newBook}) =>
        apiFetcher('/api/books', method, newBook)
    );

    return async function createBook(newBook) {
        return await mutate({newBook});
    };
}