import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom'
import useAPICall from "../../useAPICall";
import {GetPlanPago} from "../../services/cuotasApi";
import {EstadoCuenta} from "../../components/EstadoCuenta";
import {DistribucionCuotas} from "../../components/DistribucionCuotas";
import {ProyeccionMultas} from "../../components/ProyeccionMultas";

const PlanPagos = () => {
    const {planId} = useParams();

    const [planPagos,, getPlanPagos] = useAPICall(GetPlanPago)
    const {placa, propietario, rtn, solicitanteNombre,
        fechaEmision,
        solicitanteIdentificacion, estadoCuenta,distribucionCuotas, proyeccionMultas} = planPagos || {};

    useEffect(() =>{
        getPlanPagos({planId})
    },[]);


    const dateLegend = (planPagoDate) => {
        const originalDate = new Date(planPagoDate);
        return `${originalDate.getDay()}/${originalDate.getMonth()}/${originalDate.getFullYear()}`
    }

    const mapDistribucionCuotas = (distribucion) =>{
        return {
            distribucionCuotas : distribucion
        }
    }
    return (
        <div className="card w-100">

            <img
                className="card-media mx-auto d-block"
                src={process.env.PUBLIC_URL + "/logo IP.png"}
                alt=""
            />
            {
                planPagos &&  <div className="card-body">
                    <div id="subscription">
                        <h4 className="card-title">Plan de Pago # {planId}</h4>
                        <p className="card-description">
                           Fecha de Emision {dateLegend(fechaEmision)}
                        </p>
                        <hr/>
                        <div className="plan-pago">
                            <h5>Datos Generales</h5>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <p className="label-list">Placa de vehículo:</p>
                                    <p className="info-list">{placa}</p>
                                </li>
                                <li className="list-group-item">
                                    <p className="label-list">RTN:</p>
                                    <p className="info-list">{rtn}</p>
                                </li>
                                <li className="list-group-item">
                                    <p className="label-list">Nombre del propietario:</p>
                                    <p className="info-list">{propietario}</p>
                                </li>
                                <li className="list-group-item">
                                    <p className="label-list">Nombre de la persona solicitante de plan de pago:</p>
                                    <p className="info-list">{solicitanteNombre}</p>
                                </li>
                                <li className="list-group-item">
                                    <p className="label-list">Identidad de la persona solicitante de plan de pago:</p>
                                    <p className="info-list">{solicitanteIdentificacion}</p>
                                </li>
                            </ul>
                            <EstadoCuenta estadoCuenta={estadoCuenta}/>
                            <DistribucionCuotas distribucion={mapDistribucionCuotas(distribucionCuotas)}/>
                            <ProyeccionMultas proyeccionMultas={proyeccionMultas}/>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default PlanPagos;

