export const fetchCuotas = async ({signal}) => {

    const response = await fetch(
        'http://www.mocky.io/v2/5ec34389300000940039bf50'
    );

    const data = await response.json();
    if(response.status !== 200) {
        throw new Error('Error fetching data')

    }
    return data;
}