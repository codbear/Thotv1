import useMutateBookByMethod from "./useMutateBookByMethod";

export default function useUpdateBook() {

    return useMutateBookByMethod('PUT');
}