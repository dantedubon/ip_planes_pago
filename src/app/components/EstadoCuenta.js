import React from "react";
import {currencyFormatter} from "../helpFunctions/help";

const DetalleEstadoCuenta = ({periodo}) => {

    return (
        <tr >
            <th scope="row">{periodo.periodo}</th>
            <td>{currencyFormatter(periodo.tuav)}</td>
            <td>{currencyFormatter(periodo.tuavMulta)}</td>
            <td>{currencyFormatter(periodo.tuavTotal)}</td>
            <td>{currencyFormatter(periodo.tvm)}</td>
            <td>{currencyFormatter(periodo.tvmMulta)}</td>
            <td>{currencyFormatter(periodo.tvmTotal)}</td>
            <td>{currencyFormatter(periodo.cspssxxi)}</td>
            <td>{currencyFormatter(periodo.total)}</td>
        </tr>
    );
};

const TotalEstadoCuenta = ({estadoCuenta}) => {
    const {tuav, tuavMulta, tuavTotal, tvm, tvmMulta, tvmTotal, cspssxxi, total} = estadoCuenta

    return (
        <tr className="total-row">
            <th scope="row">Total</th>
            <td>{currencyFormatter(tuav)}</td>
            <td>{currencyFormatter(tuavMulta)}</td>
            <td>{currencyFormatter(tuavTotal)}</td>
            <td>{currencyFormatter(tvm)}</td>
            <td>{currencyFormatter(tvmMulta)}</td>
            <td>{currencyFormatter(tvmTotal)}</td>
            <td>{currencyFormatter(cspssxxi)}</td>
            <td>{currencyFormatter(total)}</td>
        </tr>
    )
}
export const EstadoCuenta = ({estadoCuenta}) => {

    return (
        <>
            <h5 className="mt-3">Estado de Cuenta</h5>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Período</th>
                        <th scope="col">TUAV</th>
                        <th scope="col">Multa TUAV</th>
                        <th scope="col">Total TUAV</th>
                        <th scope="col">TVM</th>
                        <th scope="col">Multa TVM</th>
                        <th scope="col">Total TVM</th>
                        <th scope="col">CSPSSXXI</th>
                        <th scope="col">Saldo Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {estadoCuenta.detalle.map((periodo) => {
                        return (
                            <DetalleEstadoCuenta key={periodo.periodo} periodo={periodo}/>
                        );
                    })}
                    <TotalEstadoCuenta estadoCuenta={estadoCuenta}/>
                    </tbody>
                </table>
            </div>
        </>
    );
};