import React from "react";
import {currencyFormatter} from "../helpFunctions/help";

export const ProyeccionMultas = ({proyeccionMultas}) => {
    if (!proyeccionMultas) {
        return null;
    }

    const {detalle, tuavMulta, tvmMulta, total} = proyeccionMultas;
    return (
        <>
            <h5 className="mt-4">Proyeccion de Multas</h5>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Periodo</th>
                        <th scope="col">Multa TUAV</th>
                        <th scope="col">Multa TVM</th>
                        <th scope="col">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {detalle.map(proyeccion => {
                        return (
                            <tr key={proyeccion.periodo}>
                                <th scope="row">{proyeccion.periodo}</th>
                                <td>{currencyFormatter(proyeccion.tuavMulta)}</td>
                                <td>{currencyFormatter(proyeccion.tvmMulta)}</td>
                                <td>{currencyFormatter(proyeccion.total)}</td>
                            </tr>
                        )

                    })}

                    <tr className="total-row">
                        <th scope="row">Total</th>
                        <td>{currencyFormatter(tuavMulta)}</td>
                        <td>{currencyFormatter(tvmMulta)}</td>
                        <td>{currencyFormatter(total)}</td>
                    </tr>
                    </tbody>
                </table>



            </div>
        </>
    )
}