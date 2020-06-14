// Render Prop

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import InputIp from "../../components/inputIp";
import * as yup from "yup";
import { isEmpty } from "lodash";
import useAPICall from "../../useAPICall";
import { setClientData } from "./subscriptionSlice";
import { fetchClientData } from "../../services/moraApi";
import { useLocation, useHistory } from "react-router-dom";

const queryString = require("query-string");

const schema = yup.object({
  RTN: yup.string().required("Campo Requerido"),

  VIN: yup
    .number()
    .typeError("Este campo solo acepta numeros")
    .required("Campo Requerido"),
  Propietario: yup.boolean().required("Debe seleccionar una opción"),
  Identidad: yup.string().when("Propietario", {
    is: false,
    then: yup
        .string()
        .required("La identidad es requerida")
        .matches(/^[0-9]+$/, "Solo se aceptan digitos")
        .min(13, 'Debe de ser exactamente 13 digitos')
        .max(13, 'Debe de ser exactamente 13 digitos')


  }),
  Nombre: yup.string().when("Propietario", {
    is: false,
    then: yup.string().required("El nombre es requerido"),
  }),
});

const Subscription = () => {
  const { search } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { placa } = queryString.parse(search);

  const [result, error, start] = useAPICall(fetchClientData);

  useEffect(() => {
    if (result) {
      dispatch(setClientData(result));
      history.push("/account");
    }
  }, [result, dispatch, history]);

  const handleSubmit= (RTN, VIN, identidad, nombreRegistrado) => {
      dispatch(setClientData({identidad, nombreRegistrado}))
        start({
            Placa: placa,
            RTN: RTN,
            VIN: VIN
        })
    }

  return (
      <div className="card">
          <img
              className="card-media mx-auto d-block"
              src={process.env.PUBLIC_URL + "/logo IP.png"}
              alt=""
          />
          <div className="card-body">
              <div >

                  <h4 className="card-title">Subscripción de Plan de Pago</h4>
                  <p className="card-description">
                      Por favor ingrese el número de RTN del propietario según el sistema a el
                      número de motor,VIN o Chasis
                  </p>
                  <hr />
                  <Formik
                      validationSchema={schema}
                      onSubmit={(values, actions) => {

                          handleSubmit(values.RTN, values.VIN, values.Identidad, values.Nombre)
                      }

                      }
                      initialValues={{
                          RTN: "",
                          VIN: "",

                          Propietario: false,
                          Identidad: "",
                          Nombre: "",
                      }}
                  >
                      {({ handleSubmit, values, isValid, touched }) => (
                          <Form noValidate onSubmit={handleSubmit}>
                              <InputIp
                                  controlId="RTN"
                                  label="RTN*"
                                  type="text"
                                  name="RTN"
                                  helpText="Ingresar el RTN que aparece en la última boleta de revisión pagada."
                              />
                              <InputIp
                                  controlId="VIN"
                                  label="Numero de Motor, Vin o Chasis*"
                                  type="text"
                                  name="VIN"
                                  helpText="Ingresar los últimos 4 dígitos de motor, VIN o chasis al cual desea subscribir el pago."
                              />

                              <h6>¿El vehículo se encuentra registrado a su nombre?</h6>

                              <InputIp
                                  controlId="SiEsPropietario"
                                  label="Si"
                                  type="radio"
                                  value="true"
                                  showFeedback={false}
                                  name="Propietario"
                                  groupClassName="form-check form-check-inline"
                                  inputClassName="form-check-input"
                                  labelClassName="form-check-label"
                              />
                              <InputIp
                                  controlId="NoEsPropietario"
                                  label="No"
                                  type="radio"
                                  value="false"
                                  name="Propietario"
                                  groupClassName="form-check form-check-inline"
                                  inputClassName="form-check-input"
                                  labelClassName="form-check-label"
                              />

                              {values.Propietario === "false" && (
                                  <InputIp
                                      controlId="Identidad"
                                      label="Identidad"
                                      type="text"
                                      name="Identidad"
                                  />
                              )}

                              {values.Propietario === "false" && (
                                  <InputIp
                                      controlId="Nombre"
                                      label="Nombre Completo"
                                      type="text"
                                      name="Nombre"
                                  />
                              )}
                              <hr />

                              {error && (
                                  <div className="alert alert-danger alert-dismissible fade show">
                                      <strong>Error!</strong> {error}
                                  </div>
                              )}
                              <div className="form-actions mt-3">
                                  <button
                                      type="submit"
                                      className="btn btn-primary mr-1"
                                      data-toggle="modal"
                                      data-target="#exampleModal"
                                      disabled={!isValid || isEmpty(touched)}
                                  >
                                      Enviar
                                  </button>
                                  <button type="button" className="btn btn-secondary">
                                      Cancelar
                                  </button>
                              </div>
                          </Form>
                      )}
                  </Formik>
              </div>
          </div>
      </div>
  );
};

export default Subscription;
