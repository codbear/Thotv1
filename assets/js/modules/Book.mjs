import Ajax from "./Ajax";

class Book {

    constructor(modalBox) {
        this.modalBox = {};
        this.details = {};
        this.modalBox.$wrapper = modalBox.contentWrapper;
        this.modalBox.$loader = this.modalBox.$wrapper.querySelector('.mb-loader');
        this.modalBox.$error = this.modalBox.$wrapper.querySelector('.mb-error');
        this.modalBox.$content = this.modalBox.$wrapper.querySelector('.mb-content');
        this.closeBox = modalBox.closeBox;
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
        request.execute((book) => {
            this.setDetails(book);
            this.listenDeleteBtn();
            this.listenEditBtn();
            this.toggleLoader();
            this.toggleBookDetails();
        }, (statusCode, statusText) => {
            this.setErrorMessage('info', statusText, 'fetch');
            this.toggleErrorMessage();
            this.toggleLoader();
        });
        return request;
    }

    listenDeleteBtn() {
        let $deleteBtn = document.getElementById('book-delete');
        $deleteBtn.addEventListener('click', (e) => {
            this.delete(e)
        }, {once: true})
    }

    listenEditBtn() {
        let $editBtn = document.getElementById('book-edit');
        $editBtn.addEventListener('click', () => {
            window.location = '/book/update/' + this.bookId;
        }, {once: true})
    }

    delete(event) {
        this.resetContent();
        let request = new Ajax('/api/books/' + this.bookId);
        request.setMethod('DELETE');
        request.execute(() => {
            this.closeBox(event);
            let $bookCard = document.querySelector('[data-bookid="' + this.bookId + '"]');
            $bookCard.style.display = 'none';
        }, (statusCode, statusText) => {
            this.setErrorMessage('danger', statusText, 'delete');
            this.toggleLoader();
            this.toggleErrorMessage();
        });
    }

    setDetails(book) {
        this.details.$title = this.modalBox.$wrapper.querySelector('.bookTitle');
        this.details.$title.textContent = book.title || '-';
        this.details.$author = this.modalBox.$wrapper.querySelector('.bookAuthor');
        this.details.$author.textContent = book.author.name || '-';
        this.details.$publisher = this.modalBox.$wrapper.querySelector('.bookPublisher');
        this.details.$publisher.textContent = book.publisher.name || '-';
        this.details.$collection = this.modalBox.$wrapper.querySelector('.bookCollection');
        this.details.$collection.textContent = book.collection.name || '-';
        this.details.$genre = this.modalBox.$wrapper.querySelector('.bookGenre');
        this.details.$genre.textContent = book.genre.name || '-';
        this.details.$format = this.modalBox.$wrapper.querySelector('.bookFormat');
        this.details.$format.textContent = book.format.name || '-';
        this.details.$summary = this.modalBox.$wrapper.querySelector('.bookSummary');
        this.details.$summary.textContent = book.description || '-';
        this.details.$isbn = this.modalBox.$wrapper.querySelector('.bookIsbn');
        this.details.$isbn.textContent = book.isbn || '-';
        this.details.$volume = this.modalBox.$wrapper.querySelector('.bookVolume');
        this.details.$volume.textContent = book.volume > 0 ? book.volume : '-';
        this.details.$observations = this.modalBox.$wrapper.querySelector('.bookObservations');
        this.details.$observations.textContent = book.observations || '-';
        this.details.$publicationDate = this.modalBox.$wrapper.querySelector('.bookPublicationDate');
        this.details.$publicationDate.textContent = book.publication_year || '-';
        this.details.$hasBeenRead = this.modalBox.$wrapper.querySelector('.bookHasBeenRead');
        this.details.$hasBeenRead.textContent = book.has_been_read ? 'Oui' : 'Non';
        this.details.$isDematerialized = this.modalBox.$wrapper.querySelector('.bookIsDematerialized');
        this.details.$isDematerialized.textContent = book.is_ebook ? 'Oui' : 'Non';
        this.details.$bookCover = this.modalBox.$wrapper.querySelector('.card-img-top');
        this.details.$bookCover.onerror = () => this.details.$bookCover.src = '/img/book_cover_placeholder.png';
        this.details.$bookCover.src = 'https://pictures.abebooks.com/isbn/' + book.isbn + '-us-300.jpg';
    }

    setErrorMessage(level, message = '', tryAgain = () => {
    }) {
        this.modalBox.$errorWrapper = document.createElement('div');
        this.modalBox.$errorWrapper.classList.add('mb-error-message');
        this.modalBox.$errorMessage = document.createElement('p');
        this.modalBox.$errorMessage.textContent = message === "offline"
            ? 'La requête n\'a pas abouti, veuillez vérifier votre connexion.'
            : 'Une erreur est survenue, merci de réessayer ultérieurement.'

        this.modalBox.$tryAgainBtn = document.createElement('button');
        this.modalBox.$tryAgainBtn.textContent = "Réessayer";
        this.modalBox.$tryAgainBtn.classList.add('btn', 'btn-' + level);
        switch (tryAgain) {
            case 'fetch' :
                this.modalBox.$tryAgainBtn.addEventListener('click', () => this.fetch(this.bookId));
                break;
            case 'delete' :
                this.modalBox.$tryAgainBtn.addEventListener('click', (e) => this.delete(e));
                break;
        }

        this.modalBox.$closeBtn = document.createElement('button');
        this.modalBox.$closeBtn.textContent = "Fermer";
        this.modalBox.$closeBtn.classList.add('btn', 'btn-dark');
        this.modalBox.$closeBtn.addEventListener('click', this.closeBox, {once: true});

        this.modalBox.$errorWrapper.appendChild(this.modalBox.$errorMessage);
        this.modalBox.$errorWrapper.appendChild(this.modalBox.$tryAgainBtn);
        this.modalBox.$errorWrapper.appendChild(this.modalBox.$closeBtn);
        this.modalBox.$error.appendChild(this.modalBox.$errorWrapper);
    }

    toggleLoader() {
        if (this.modalBox.$loader.style.display === 'none') {
            this.modalBox.$loader.style.removeProperty('display');
        } else {
            this.modalBox.$loader.style.display = 'none';
        }
    }

    toggleErrorMessage() {
        if (this.modalBox.$error.style.display === 'none') {
            this.modalBox.$error.style.removeProperty('display');
        } else {
            this.modalBox.$error.style.display = 'none';
        }
    }

    toggleBookDetails() {
        if (this.modalBox.$content.style.display === 'none') {
            this.modalBox.$content.style.removeProperty('display');
        } else {
            this.modalBox.$content.style.display = 'none';
        }
    }
}

export default Book;