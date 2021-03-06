import Book from "../modules/Book";
import ModalBox from "../modules/ModalBox";
import "../../scss/homepage.css";

const $mbWrapper = document.querySelector('.mb-wrapper');
const modalBox = new ModalBox(document.querySelector('.modal-box'))
const book = new Book(modalBox);
const $bookCardsCollection = document.querySelectorAll('.book-card');

$bookCardsCollection.forEach(($bookCard) => {
    let bookId = $bookCard.dataset.bookid;
    const $bookCover = $bookCard.querySelector('.card-img-top');
    $bookCover.onerror = () => $bookCover.src = 'img/book_cover_placeholder.png';
    $bookCard.addEventListener('click', (e) => {
        e.preventDefault();
        let request = book.fetch(bookId);
        modalBox.onClose = () => {
            request.xhr.abort();
        }
        modalBox.openBox();
    })
})