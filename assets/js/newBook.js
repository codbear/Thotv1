import Ajax from "./modules/Ajax";

const $searchButton = document.getElementById('isbnSearchBtn');
const $isbnInput = document.getElementById('book_isbn');
const isbn10regex = /^[0-9X]{10}$/;
const isbn13regex = /^97[8-9][0-9]{10}$/;

function checkIsbn(isbn) {
    return (isbn10regex.test(isbn) || isbn13regex.test(isbn));
}

function toggleIsbnInputError() {
    let isbn = $isbnInput.value;
    let isValid = checkIsbn(isbn);
    if (isValid) {
        $isbnInput.classList.remove('is-invalid');
        $isbnInput.classList.add('is-valid');
    } else {
        $isbnInput.classList.remove('is-valid');
        $isbnInput.classList.add('is-invalid');
    }
    return isValid;
}

$isbnInput.addEventListener('input', (e) => {
    let isbn = $isbnInput.value;
    toggleIsbnInputError();
})

$searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    let isbn = $isbnInput.value;
    if (toggleIsbnInputError()) {
        let request = new Ajax('/api/search/external/' + isbn);
        request.execute();
    }
})