import { useEffect } from "react";
import { startLoad, endLoad } from "./globalSlice";
import { useDispatch } from "react-redux";
import { useAsyncTask } from "react-hooks-async";


function useAPICall(asyncFunction) {
  const dispatch = useDispatch();
  const { start, started, result, error, pending } = useAsyncTask(
    asyncFunction
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
