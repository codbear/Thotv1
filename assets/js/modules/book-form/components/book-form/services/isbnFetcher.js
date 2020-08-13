export default async function isbnFetcher(isbn) {
    const response = await fetch('/api/search/external/' + isbn);

    if (!response.ok) throw new Error('Une erreur inattendue est survenue.');

    return response.json();
}