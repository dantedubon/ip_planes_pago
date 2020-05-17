 export const fetchClientData = async (
    { signal },
    { RTN, Placa, VIN, Identidad, Nombre }
  ) => {
    console.log("RTN", RTN);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic UGxhblBhZ286ZGVtbw==");
  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  //   const response = await fetch(
  //     "http://www.mocky.io/v2/5ebf67953200005c000c342d",
  //     requestOptions
  //   );
  
    const response = await fetch(
      "http://www.mocky.io/v2/5ebf26ce3200005c000c33a5",
      requestOptions
    );
  
    const data = await response.json();
  
    if (response.status !== 200) {
      throw data.details;
    }
  
    return data;
  };
  
 