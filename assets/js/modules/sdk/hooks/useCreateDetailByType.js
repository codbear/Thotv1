import useCreateDetailByUrl from "./useCreateDetailByUrl";

export default function useCreateDetailByType(resourceType) {
    const resourceUrl = '/api/' + resourceType;

    return useCreateDetailByUrl(resourceUrl);
}