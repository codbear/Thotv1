import filterMatchingOptions from "../../autocomplete/services/filterMatchingOptions";
import useCreateDetailByType from "./useCreateDetailByType";

const detailsToCheck = ['authors', 'genres', 'publishers'];
const HLDMapper = {
    authors: (bookDetails) => bookDetails.author.name,
    genres: (bookDetails) => bookDetails.genre.name,
    publishers: (bookDetails) => bookDetails.publisher.name,
}

export default function useCreateDetailsIfNeeded(authors, genres, publishers) {
    const hld = {authors, genres, publishers};

    const config = detailsToCheck.reduce((acc, detailName) => {
        acc[detailName] = {create: useCreateDetailByType(detailName),};
        return acc;
    }, {});

    return (bookDetails) => {
        detailsToCheck.forEach((detail) => {
            const detailValue = HLDMapper[detail](bookDetails);
            if (detailValue === null) {
                return;
            }
            const [perfectlyMatchingOptions] = filterMatchingOptions(detailValue, hld[detail]);

            if (perfectlyMatchingOptions.length === 0) {
                config[detail].create(detailValue);
            }
        })
    };
}