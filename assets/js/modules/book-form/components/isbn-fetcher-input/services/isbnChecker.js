export default function isbnChecker(isbnToCheck) {
    const isbn10regex = /^[0-9X]{10}$/;
    const isbn13regex = /^97[8-9][0-9]{10}$/;

    return (isbn10regex.test(isbnToCheck) || isbn13regex.test(isbnToCheck));
}