export const currencyFormatter = (data) => {
    if (data === 0) {
        return "-";
    }
    return new Intl.NumberFormat("es-HN", {
        style: "currency",
        currency: "HNL",
    }).format(data);
};
export const dateFormatter = (data) => {
    const date = new Date(data);
    const dateFormat = new Intl.DateTimeFormat("es", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
    const [
        {value: day},
        ,
        {value: month},
        ,
        {value: year},
    ] = dateFormat.formatToParts(date);


    return `${day}/${month}/${year}`;
};