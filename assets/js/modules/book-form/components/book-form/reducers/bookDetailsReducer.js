export default function bookDetailsReducer(state, action) {
    switch (action.type) {
        case 'setId':
            return {...state, id: action.payload}
        case 'setIsbn':
            return {...state, isbn: action.payload}
        case 'setTitle':
            return {...state, title: action.payload}
        case 'setVolume':
            return {...state, volume: action.payload}
        case 'setAuthor':
            return {...state, author: action.payload}
        case 'setPublisher':
            return {...state, publisher: action.payload}
        case 'setPublicationYear':
            return {...state, publicationYear: action.payload}
        case 'setCollection':
            return {...state, collection: action.payload}
        case 'setGenre':
            return {...state, genre: action.payload}
        case 'setDescription':
            return {...state, description: action.payload}
        case 'setFormat':
            return {...state, format: action.payload}
        case 'setIsEbook':
            return {...state, isEbook: action.payload}
        case 'setHasBeenRead':
            return {...state, hasBeenRead: action.payload}
        case 'setObservations':
            return {...state, observations: action.payload}
        case 'setBookDetails':
            return action.payload
        default:
            return state;
    }
}