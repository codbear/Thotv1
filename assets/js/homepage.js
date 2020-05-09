import {Book} from './modules/Book.mjs';
import {ModalBox} from "./modules/ModalBox";
import '../css/homepage.css'

const $triggers = document.querySelectorAll('.mb-trigger');
const $mbWrapper = document.querySelector('.mb-wrapper');
const modalBox = new ModalBox(document.querySelector('.modal-box'))
const book = new Book($mbWrapper);

$triggers.forEach(($trigger) => {
    let bookId = $trigger.dataset.bookid;
    $trigger.addEventListener('click', (e) => {
        e.preventDefault();
        let request = book.fetch(bookId);
        modalBox.openBox(() => {
            request.xhr.abort();
        })
    })
})