const formatDateAdmin = (dateString: string) => {
    const [day, month, year] = dateString.split('/');

    const date = new Date(`${year}-${month}-${day}`);

    const dayFormatter = new Intl.DateTimeFormat('id-ID', { weekday: 'long' });
    const dateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const dayString = dayFormatter.format(date);
    const dateStringFormatted = dateFormatter.format(date);

    return `${dayString}, ${dateStringFormatted}`;
};

export default formatDateAdmin;