export function formatDate(dateString: Date) {
    const date = new Date(dateString);
    return date.toLocaleString().replace(',','').replaceAll('/', '-');
};