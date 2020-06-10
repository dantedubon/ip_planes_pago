import GetAuth from "./auth";

export const fetchCuotas = async ({signal}) => {


    const url = `${process.env.REACT_APP_BASE_URL_API}/nroCuotas`;
    const myHeaders = new Headers();
    const auth = GetAuth();

    myHeaders.append("Authorization", `Basic ${auth}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const response = await fetch(
         url,
         requestOptions
     );

    /*const response = await fetch(
        'http://www.mocky.io/v2/5ec34389300000940039bf50'
    );*/

    const data = await response.json();
    if(response.status !== 200) {
        throw new Error('Error fetching data')

    }
    return data;
}

export const fetchDistribucionCuotas = async({signal}, {placa, cuotas}) => {

    const url = `${process.env.REACT_APP_BASE_URL_API}/cuotas?placa=${placa}&nroCuotas=${cuotas}`;
    const myHeaders = new Headers();
    const auth = GetAuth();

    myHeaders.append("Authorization", `Basic ${auth}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const response = await fetch(
        url,
        requestOptions
    );

    /*const response = await fetch(
        'http://www.mocky.io/v2/5ec35efe300000890039c004'
    );
*/
    const data = await response.json();
    if(response.status !== 200) {
        throw data.details;

    }
    return data;
}