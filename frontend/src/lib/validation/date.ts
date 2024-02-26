function isValidDate(dateString: string) {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!dateRegex.test(dateString)) {
        return false;
    }

    const [day, month, year] = dateString.split('/');
    const date = new Date(`${year}-${month}-${day}`);

    if (isNaN(date.getTime())) {
        return false;
    }

    if (
        date.getDate() !== parseInt(day, 10) ||
        date.getMonth() + 1 !== parseInt(month, 10) ||
        date.getFullYear() !== parseInt(year, 10)
    ) {
        return false;
    }

    return true;
}

export default isValidDate;
