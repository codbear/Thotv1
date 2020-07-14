export default function bookDetailsReducer(state, action) {
    switch (action.type) {
        case 'id':
            return {...state, id: action.payload}
        case 'isbn':
            return {...state, isbn: action.payload}
        case 'title':
            return {...state, title: action.payload}
        case 'volume':
            return {...state, volume: action.payload}
        case 'author':
            return {...state, author: action.payload}
        case 'publisher':
            return {...state, publisher: action.payload}
        case 'publicationYear':
            return {...state, publicationYear: action.payload}
        case 'collection':
            return {...state, collection: action.payload}
        case 'genre':
            return {...state, genre: action.payload}
        case 'description':
            return {...state, description: action.payload}
        case 'format':
            return {...state, format: action.payload}
        case 'isEbook':
            return {...state, isEbook: action.payload}
        case 'hasBeenRead':
            return {...state, hasBeenRead: action.payload}
        case 'observations':
            return {...state, observations: action.payload}
        case 'externalFetch':
            return action.payload
        default:
            return state;
    }
}