import useCreateDetailByType from "./useCreateDetailByType";
import isMatching from "../../book-form/components/book-form/services/isMatching";
import {useReducer} from "react";
import highLevelDetailsReducer from "../../book-form/reducers/highLevelDetailsReducer";

const detailsToCheck = ['authors', 'genres', 'publishers'];
const detailDispatcherActionTypeMapper = {
    authors: 'setAuthor',
    genres: 'setGenres',
    publishers: 'setPublisher',
}
const HLDMapper = {
    authors: (bookDetails) => bookDetails.author ?? null,
    genres: (bookDetails) => bookDetails.genre ?? null,
    publishers: (bookDetails) => bookDetails.publisher ?? null,
}

export default function useCreateDetailsIfNeeded(authors, genres, publishers) {
    const hld = {authors, genres, publishers};

    const config = detailsToCheck.reduce((acc, detailName) => {
        acc[detailName] = {create: useCreateDetailByType(detailName),};
        return acc;
    }, {});

    const [createdDetails, dispatchCreatedDetail] = useReducer(highLevelDetailsReducer, {
        author: null,
        genre: null,
        publisher: null
    });

    function getDetailDispatcherFromDetail(detail) {
        let actionType = detailDispatcherActionTypeMapper[detail];
        return (actionPayload) => dispatchCreatedDetail({type: actionType, payload: actionPayload});
    }

    return [createdDetails, (bookDetails) => {
        detailsToCheck.forEach(async (detail) => {
            const detailToCreate = HLDMapper[detail](bookDetails)

            if (detailToCreate === null) {
                return;
            }

            if (hld[detail].find(isMatching(detailToCreate))) {
                return
            }

            getDetailDispatcherFromDetail(detail)(await config[detail].create(detailToCreate.name));
        })
    }];
}