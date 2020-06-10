import GetAuth from './auth';

export const fetchClientData = async (
    {signal},
    {RTN, Placa, VIN, Identidad, Nombre}
) => {

    const myHeaders = new Headers();
    const auth = GetAuth();

    myHeaders.append("Authorization", `Basic ${auth}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    const url = `${process.env.REACT_APP_BASE_URL_API}/mora?Placa=${Placa}&Rtn=${RTN}&UltimosDigitos=${VIN}`;
    const response = await fetch(
        url,
        requestOptions
    );

   /* const response = await fetch(
        "http://www.mocky.io/v2/5ebf26ce3200005c000c33a5",
        requestOptions
    );*/

    const data = await response.json();

    if (response.status !== 200) {
        throw data.details;
    }

    return data;
};
  
 