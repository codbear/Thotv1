export default function requiredFieldsStatusReducer(state, action) {
    switch (action.type) {
        case 'setTitleStatus':
            return {...state, title: action.payload}
        case 'setAuthorStatus':
            return {...state, author: action.payload}
        case 'setGenreStatus':
            return {...state, genre: action.payload}
        case 'setPublisherStatus':
            return {...state, publisher: action.payload}
        case 'setCollectionStatus':
            return {...state, collection: action.payload}
        case 'setFormatStatus':
            return {...state, format: action.payload}
        default:
            return state;
    }
}