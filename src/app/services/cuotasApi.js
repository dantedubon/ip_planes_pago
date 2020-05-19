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

export const fetchDistribucionCuotas = async({signal}, {placa, cuotas}) => {
    const response = await fetch(
        'http://www.mocky.io/v2/5ec35efe300000890039c004'
    );

    const data = await response.json();
    if(response.status !== 200) {
        throw new Error('Error fetching data')

    }
    return data;
}