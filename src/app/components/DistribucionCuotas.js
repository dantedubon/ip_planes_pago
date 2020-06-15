import {currencyFormatter, dateFormatter} from "../helpFunctions/help";
import React from "react";

export const DistribucionCuotas = ({distribucion}) => {
    if (!distribucion) {
        return null;
    }

    const {distribucionCuotas} = distribucion;

    return (
        <>
            <h5 className="mt-4">Distribución de Cuotas</h5>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Cuota</th>
                        <th scope="col">Fecha de Pago</th>
                        <th scope="col">Tasa y multa vehícular</th>
                        <th scope="col">Tasa y multa municipal</th>
                        <th scope="col">Contribución SPS Siglo XXI</th>
                        <th scope="col">Total a pagar</th>
                        <th scope="col">No. IP-150</th>
                    </tr>
                    </thead>
                    <tbody>
                    {distribucionCuotas.detalle.map((periodo) => {
                        return (
                            <tr key={periodo.nroCuota}>
                                <th scope="row">{periodo.nroCuota}</th>
                                <td>{dateFormatter(periodo.fechaPago)}</td>
                                <td>{currencyFormatter(periodo.tuav)}</td>
                                <td>{currencyFormatter(periodo.tvm)}</td>
                                <td>{currencyFormatter(periodo.cspssxxi)}</td>
                                <td>{currencyFormatter(periodo.total)}</td>
                                <td>{periodo.comprobante}</td>
                            </tr>
                        );
                    })}

                    <tr className="total-row">
                        <th scope="row">Total</th>
                        <td>{currencyFormatter(distribucionCuotas.tuav)}</td>
                        <td>{currencyFormatter(distribucionCuotas.tvm)}</td>
                        <td>{currencyFormatter(distribucionCuotas.cspssxxi)}</td>
                        <td>-</td>
                        <td>{currencyFormatter(distribucionCuotas.total)}</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};