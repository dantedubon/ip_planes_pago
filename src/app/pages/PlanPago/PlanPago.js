import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom'
import useAPICall from "../../useAPICall";
import {GetPlanPago} from "../../services/cuotasApi";

const PlanPagos = () => {
    const {planId} = useParams();

    const [planPagos,, getPlanPagos] = useAPICall(GetPlanPago)

    useEffect(() =>{
        getPlanPagos({planId})
    },[]);

    console.log(planId)
    console.log(planPagos)
    return (
        <div>
            Hola
        </div>
    )
}

export default PlanPagos;

