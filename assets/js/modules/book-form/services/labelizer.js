export default function labelizer(resource) {
    switch (resource) {
        case 'authors':
            return 'Auteur';
        case 'publishers':
            return 'Éditeur';
        case 'genres':
            return 'Genre';
        case 'formats':
            return 'Format';
        case 'collections':
            return 'Collection';
        default:
            return resource[0].toUpperCase() + resource.substring(1);
    }
}