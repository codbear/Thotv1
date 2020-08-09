import {useMutation} from "react-query";
import apiFetcher from "../../../services/apiFetcher";

export default function useCreateDetailByUrl(resourceUrl) {
    const [mutate] = useMutation(({value}) =>
        apiFetcher(resourceUrl, 'POST', {name: value})
    );

    return async function createNewResource(value) {
        return await mutate({value});
    };
}