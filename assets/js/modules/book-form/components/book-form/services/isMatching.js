export default function isMatching(detailToCheck) {
    return (detailInDb) => detailInDb.name.toLowerCase() === detailToCheck.name.toLowerCase();
}