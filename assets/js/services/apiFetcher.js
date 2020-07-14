export default async function apiFetcher(route, method = 'GET', data = {}) {
    let headers = new Headers({
        'Content-Type': 'application/json',
    });

    let options = {
        method: method,
        headers: headers,
    }

    if (method !== 'GET') options.body = JSON.stringify(data);
//route+='c';
    const response = await fetch(route, options);

    if (!response.ok) {
        if (response.status === 404 || response.status >= 500) {
            throw new Error('Une erreur est survenue lors de la connexion à la base de données, et les détails nécessaires à l\'ajout d\'un livre n\'ont pas pu être chargés. Veuillez réessayer ultérieurement.');
        }
        if (response.status === 400) {
            throw new Error('Il manque une ou plusieurs informations importantes. Veuillez compléter le formulaire et réessayer.');
        }
        throw new Error('Une erreur inattendue est survenue, veuillez réessayer.');
    }

    switch (response.status) {
        case 204:
            return response;
        default:
            return response.json();
    }
}