// Render Prop

import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import InputIp from "../../components/inputIp";
import { setClientData } from "./subscriptionSlice";
import * as yup from "yup";
import { useAsyncTask } from "react-hooks-async";
import { useDispatch } from "react-redux";
import { startLoad, endLoad } from "../../globalSlice";
import { isEmpty } from "lodash";

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
  const response = await fetch(
    "http://www.mocky.io/v2/5ebf67953200005c000c342d",
    requestOptions
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw data.details;
  }

  // const response = await fetch(
  //   "http://www.mocky.io/v2/5ebf26ce3200005c000c33a5",
  //   requestOptions
  // );

  return data;
};

const schema = yup.object({
  RTN: yup.string().required("Campo Requerido"),
  Placa: yup.string(),
  VIN: yup
    .number()
    .typeError("Este campo solo acepta numeros")
    .required("Campo Requerido"),
  Propietario: yup.boolean().required("Debe seleccionar una opción"),
  Identidad: yup.string().when("Propietario", {
    is: false,
    then: yup.string().required("La identidad es requerida"),
  }),
  Nombre: yup.string().when("Propietario", {
    is: false,
    then: yup.string().required("El nombre es requerido"),
  }),
});

const Subscription = () => {
  const dispatch = useDispatch();

  const task = useAsyncTask(fetchClientData);

  const { pending, started, start, error: apiError, result } = task;
  console.log("Error", apiError);
  console.log("Result", result);

  if (result) {
    dispatch(setClientData(result));
  }

  useEffect(() => {
    if (started) {
      dispatch(startLoad());
    }
  });

  useEffect(() => {
    if (!pending) {
      dispatch(endLoad());
    }
  });

  return (
    <div>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) =>
          start({
            Placa: values.Placa,
            RTN: values.RTN,
            VIN: values.VIN,
          })
        }
        initialValues={{
          RTN: "",
          VIN: "",
          Placa: "",
          Propietario: undefined,
          Identidad: undefined,
          Nombre: undefined,
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
            <InputIp controlId="Placa" label="Placa" type="text" name="Placa" />

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
  );
};

export default Subscription;
