export default function filterMatchingOptions(needle, options) {
    needle = needle.toLowerCase();
    const matchingOptions = options.filter(option => option.name.toLowerCase().indexOf(needle) !== -1);
    const perfectlyMatchingOptions = matchingOptions.filter((option) => option.name.toLowerCase() === needle);

    return [matchingOptions, perfectlyMatchingOptions];
}