const truncateText = (text: string, maxLength = 100) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

export default truncateText;
