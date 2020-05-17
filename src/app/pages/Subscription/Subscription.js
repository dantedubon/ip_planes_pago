// Render Prop

import React, { useEffect }  from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import InputIp from "../../components/inputIp";
import * as yup from "yup";
import { isEmpty } from "lodash";
import useAPICall from '../../useAPICall';
import {setClientData} from './subscriptionSlice';
import {fetchClientData} from '../../services/moraApi';


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
 
  const [result, error, start ] = useAPICall(fetchClientData);

  useEffect(()=> {
    dispatch(setClientData(result))
  }, [result, dispatch])
 

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
