export default async function externalFetcher(isbn) {
    const isbn10regex = /^[0-9X]{10}$/;
    const isbn13regex = /^97[8-9][0-9]{10}$/;

    function checkIsbn(isbnToCheck) {
        return (isbn10regex.test(isbnToCheck) || isbn13regex.test(isbnToCheck));
    }

    const isbnIsNotValid = !checkIsbn(isbn);

    if (isbnIsNotValid) throw 'Le format du numéro ISBN que vous avez fourni n\'est pas valide.';

    const response = await fetch('/api/search/external/' + isbn);

    if (!response.ok) throw response.status;

    return response.json()
}