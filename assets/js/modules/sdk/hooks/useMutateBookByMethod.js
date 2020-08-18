import {useMutation} from "react-query";
import apiFetcher from "../../../services/apiFetcher";

export default function useMutateBookByMethod(method = 'POST') {
    const [mutate] = useMutation(({newBook}) => {
            let route = '/api/books';

            if (method === 'PUT') {
                route += '/' + newBook.id;
            }

            return apiFetcher(route, method, newBook);
        }
    );

    return async function createBook(newBook) {
        return await mutate({newBook});
    };
}