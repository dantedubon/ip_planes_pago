import { useEffect } from "react";
import { startLoad, endLoad } from "./globalSlice";
import { useDispatch } from "react-redux";
import { useAsyncTask } from "react-hooks-async";

const fetchClientData = async (
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

function useAPICall() {
  const dispatch = useDispatch();
  const { start, started, result, error, pending } = useAsyncTask(
    fetchClientData
  );

  useEffect(() => {
    if (started) {
      dispatch(startLoad());
    }
  }, [started, dispatch]);
  useEffect(() => {
    if (!pending) {
      dispatch(endLoad());
      
    }
  }, [pending, dispatch]);

  return [result, error, start];
}

export default useAPICall;
