import {Ajax} from "./Ajax";

class Book {

    constructor($modalBoxWrapper) {
        this.modalBox = {};
        this.details = {};
        this.modalBox.$wrapper = $modalBoxWrapper;
        this.modalBox.$loader = $modalBoxWrapper.querySelector('.mb-loader');
        this.modalBox.$error = $modalBoxWrapper.querySelector('.mb-error');
        this.modalBox.$content = $modalBoxWrapper.querySelector('.mb-content');
    }

    resetContent() {
        this.modalBox.$content.style.display = 'none';
        this.modalBox.$error.style.display = 'none';
        this.modalBox.$error.innerHTML = '';
        this.modalBox.$loader.style.removeProperty('display');
    }

    fetch(bookId) {
        this.resetContent();
        this.bookId = bookId;
        let request = new Ajax('/api/books/' + bookId);
        request.execute((book) => this.onSuccess(book), () => this.onError());
        return request;
    }

    onSuccess(book) {
        this.setDetails(book);
        this.modalBox.$loader.style.display = 'none';
        this.modalBox.$content.style.removeProperty('display');
    }

    onError(statusCode, statusText) {
        this.modalBox.$errorWrapper = document.createElement('div');
        this.modalBox.$errorWrapper.classList.add('mb-error-message');

        this.modalBox.$errorMessage = document.createElement('p');
        this.modalBox.$errorMessage.textContent = statusText === "offline"
            ? 'La requête n\'a pas abouti, veuillez vérifier votre connexion.'
            : 'Une erreur est survenue, merci de réessayer ultérieurement.'

        this.modalBox.$tryAgainButton = document.createElement('button');
        this.modalBox.$tryAgainButton.textContent = "Réessayer";
        this.modalBox.$tryAgainButton.addEventListener('click', () => this.fetch(this.bookId));

        this.modalBox.$errorWrapper.appendChild(this.modalBox.$errorMessage);
        this.modalBox.$errorWrapper.appendChild(this.modalBox.$tryAgainButton);

        this.modalBox.$loader.style.display = 'none';

        this.modalBox.$error.appendChild(this.modalBox.$errorWrapper);
        this.modalBox.$error.style.removeProperty('display');
    }

    setDetails(book) {
        this.details.$title = this.modalBox.$wrapper.querySelector('.bookTitle');
        this.details.$title.textContent = book.title;
        this.details.$author = this.modalBox.$wrapper.querySelector('.bookAuthor');
        this.details.$author.textContent = book.author;
        this.details.$publisher = this.modalBox.$wrapper.querySelector('.bookPublisher');
        this.details.$publisher.textContent = book.publisher;
        this.details.$collection = this.modalBox.$wrapper.querySelector('.bookCollection');
        this.details.$collection.textContent = book.collection;
        this.details.$genre = this.modalBox.$wrapper.querySelector('.bookGenre');
        this.details.$genre.textContent = book.genre;
        this.details.$format = this.modalBox.$wrapper.querySelector('.bookFormat');
        this.details.$format.textContent = book.format;
        this.details.$summary = this.modalBox.$wrapper.querySelector('.bookSummary');
        this.details.$summary.textContent = book.description;
        this.details.$isbn = this.modalBox.$wrapper.querySelector('.bookIsbn');
        this.details.$isbn.textContent = book.isbn;
        this.details.$volume = this.modalBox.$wrapper.querySelector('.bookVolume');
        this.details.$volume.textContent = book.volume;
        this.details.$observations = this.modalBox.$wrapper.querySelector('.bookObservations');
        this.details.$observations.textContent = book.observations;
        this.details.$publicationDate = this.modalBox.$wrapper.querySelector('.bookPublicationDate');
        this.details.$publicationDate.textContent = book.publication_year;
        this.details.$hasBeenRead = this.modalBox.$wrapper.querySelector('.bookHasBeenRead');
        this.details.$hasBeenRead.textContent = book.has_been_read;
        this.details.$isDematerialized = this.modalBox.$wrapper.querySelector('.bookIsDematerialized');
        this.details.$isDematerialized.textContent = book.is_ebook;
    }
}

export {Book};