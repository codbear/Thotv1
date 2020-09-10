import {useMutation} from "react-query";
import apiFetcher from "../../../services/apiFetcher";

export default function useMutateBookByMethod(method = 'POST') {
    const [mutate] = useMutation(async ({newBook}) => {
            let route = '/api/books';

            if (method === 'PUT') {
                route += '/' + newBook.id;
            }

            let response;

            try {
                response = await apiFetcher(route, method, newBook);
            } catch (e) {
                response = e;
            }

            return response
        }
    );

    return async function createBook(newBook) {
        const response = await mutate({newBook});
        if (response instanceof Error) {
            throw response;
        }
        return response;

    };
}