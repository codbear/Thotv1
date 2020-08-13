import useCreateBook from "./useCreateBook";

export default function useUpdateBook() {

    return useCreateBook('PUT');
}