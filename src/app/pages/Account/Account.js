import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectClientData} from "../Subscription/subscriptionSlice";
import {fetchCuotas, fetchDistribucionCuotas, subscribePlanPago} from "../../services/cuotasApi";
import {Button, Dropdown, DropdownButton, Modal} from "react-bootstrap";
import useAPICall from "../../useAPICall";
import QRCode from "qrcode.react";

import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';

import {useHistory} from "react-router-dom";


const currencyFormatter = (data) => {
    if (data === 0) {
        return "-";
    }
    return new Intl.NumberFormat("es-HN", {
        style: "currency",
        currency: "HNL",
    }).format(data);
};
const dateFormatter = (data) => {
    const date = new Date(data);
    const dateFormat = new Intl.DateTimeFormat("es", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
    const [
        {value: day},
        ,
        {value: month},
        ,
        {value: year},
    ] = dateFormat.formatToParts(date);


    return `${day}/${month}/${year}`;
};

const DistribucionCuotas = ({distribucion}) => {
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
                                <td>{periodo.total}</td>
                                <td>{periodo.comprobante}</td>
                            </tr>
                        );
                    })}

                    <tr>
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

const Cuotas = ({cuotas, setSelectedCuota}) => {
    const [title, setTitle] = useState("Seleccione las cuotas");
    const handleSelect = (e) => {
        setSelectedCuota(e);
        setTitle(`${e} cuotas`);
    };
    return (
        <DropdownButton
            id="cuotas"
            title={title}
            variant="primary"
            drop="down"
            onSelect={handleSelect}
        >
            {cuotas.map((cuota) => {
                return (
                    <Dropdown.Item
                        key={cuota.clave}
                        eventKey={cuota.valor}
                    >{`${cuota.valor} cuotas`}</Dropdown.Item>
                );
            })}
        </DropdownButton>
    );
};

const DetalleEstadoCuenta = ({periodo}) => {
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
const EstadoCuenta = ({estadoCuenta}) => {
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
                    </tbody>
                </table>
            </div>
        </>
    );
};

const ResultModal = ({showModal, handleClose, codigoPlanPago}) => {

    const url = `www.google.com`;
    return (
        <Modal show={showModal} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>Confirmación de Plan de Pago</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-description mt-4">Se ha generado el siguiente número de plan de pago: </p>
                <div className="alert alert-primary" role="alert">
                    <h4>{codigoPlanPago}</h4>
                </div>
                <hr/>
                <p className="text-description mb-0">Escanee con su celular el siguiente código QR o ingrese a la
                    página mediante el link.</p>
                <QRCode className="qr-box" value={url}/>
                <div className="link-container">
                    <a className="links" href={url}>{url}</a>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Imprimir Convenio
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

const Account = () => {
    const history = useHistory();
    const {placa, propietario, estadoCuenta, rtn} = useSelector(
        selectClientData
    );
    if (!placa) {
        history.push("/")
    }

    const {executeRecaptcha} = useGoogleReCaptcha();

    const [cuotas, setCuotas] = useState([]);
    const [resultCuotas, , startCuotas] = useAPICall(fetchCuotas);
    const [resultDistribucion, , startDistribucion] = useAPICall(
        fetchDistribucionCuotas
    );

    const [token, setToken] = useState(null);

    const [selectedCuota, setSelectedCuota] = useState(0);

    const [resultSubscription, , startPlanPagos] = useAPICall(subscribePlanPago);

    const [showModal, setShowModal] = useState(false);

    const acceptPlan = async () => {
        const token = await executeRecaptcha('submit')
        setToken(token)
    }
    useEffect(() => {
        if (token) {
            console.log(token)
            setShowModal(true)
            // startPlanPagos({placa, cuotas: selectedCuota, id: rtn, name: propietario, token});
        }
    }, [token, startPlanPagos])

    console.log(resultSubscription)
    useEffect(() => {
        startCuotas();
    }, [startCuotas]);

    useEffect(() => {
        if (resultCuotas) {
            setCuotas(resultCuotas);
        }
    }, [resultCuotas]);

    useEffect(() => {
        if (selectedCuota !== 0) {
            startDistribucion({placa, cuotas: selectedCuota});
        }
    }, [placa, selectedCuota, startDistribucion]);

    return (
        <>
            <ResultModal showModal={showModal} codigoPlanPago={888888} handleClose={() => setShowModal(false)}/>
            <div className="card w-100">
                <img
                    className="card-media mx-auto d-block"
                    src={process.env.PUBLIC_URL + "/logo IP.png"}
                    alt=""
                />
                <div className="card-body">
                    <div id="subscription">
                        <h4 className="card-title">Plan de pago</h4>
                        <p className="card-description">
                            Confirme sus datos e ingrese el plan de pago de conveniencia.
                        </p>
                        <hr/>
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
                            <EstadoCuenta estadoCuenta={estadoCuenta}/>
                        </div>

                        <p className="text-muted mt-3">
                            Seleccione el número de cuotas para su Plan de Pago
                        </p>
                        <Cuotas cuotas={cuotas} setSelectedCuota={setSelectedCuota}/>
                        <DistribucionCuotas distribucion={resultDistribucion}/>
                        <div className="d-flex justify-content-center mt-4">
                            {selectedCuota !== 0 && <Button onClick={acceptPlan}>
                                Aceptar Plan de Pago
                            </Button>}
                        </div>

                    </div>
                </div>
            </div>

        </>


    );
};

export default Account;
