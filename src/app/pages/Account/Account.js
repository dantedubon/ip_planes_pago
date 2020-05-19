import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectClientData } from "../Subscription/subscriptionSlice";
import { fetchCuotas } from "../../services/cuotasApi";
import { Dropdown, DropdownButton } from "react-bootstrap";
import useAPICall from "../../useAPICall";

const Cuotas = ({ cuotas }) => {
  console.log(cuotas);
  return (
    <DropdownButton
      id="cuotas"
      title="Seleccione plan de pago"
      variant="primary"
      drop="down"
    >
      {cuotas.map((cuota) => {
        return <Dropdown.Item key={cuota.clave}>{`${cuota.valor} cuotas`}</Dropdown.Item>;
      })}
    </DropdownButton>
  );
};

const DetalleEstadoCuenta = ({ periodo }) => {
  const currencyFormatter = (data) => {
    if (data === 0) {
      return "-";
    }
    return new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
    }).format(data);
  };

  return (
    <tr>
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
const EstadoCuenta = ({ estadoCuenta }) => {
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
                <DetalleEstadoCuenta key={periodo.periodo} periodo={periodo} />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

const Account = () => {
  const { placa, propietario, estadoCuenta, rtn } = useSelector(
    selectClientData
  );

  const [cuotas, setCuotas] = useState([]);
  const [result, error, start] = useAPICall(fetchCuotas);

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (result) {
      setCuotas(result);
    }
  }, [result]);

  return (
    <div>
      <h4 className="card-title">Plan de pago</h4>
      <p className="card-description">
        Confirme sus datos e ingrese el plan de pago de conveniencia.
      </p>
      <hr />
      <div className="plan-pago">
        <h5>Datos personales</h5>
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
        </ul>
        <EstadoCuenta estadoCuenta={estadoCuenta} />
      </div>

      <p className="text-muted mt-3">
        Seleccione el número de cuotas para su Plan de Pago
      </p>
      <Cuotas cuotas={cuotas} />
    </div>
  );
};

export default Account;
