
export const formatPriceCompact = (num: number): string => {
    if (num >= 1_000_000) {
        return `$${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}M`;
    }
    if (num >= 1_000) {
        return `$${(num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1)}K`;
    }
    return `$${num}`;
}

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};