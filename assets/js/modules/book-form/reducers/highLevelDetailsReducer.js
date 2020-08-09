export default function highLevelDetailsReducer(state, action) {
    switch (action.type) {
        case 'setAuthor':
            return {...state, author: action.payload};
        case 'setPublisher':
            return {...state, publisher: action.payload};
        case 'setGenre':
            return {...state, genre: action.payload};
    }
}