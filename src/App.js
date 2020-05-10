import React from "react";
import logo from "./logo.svg";
import Header from "./app/layout/header";
import { Counter } from "./features/counter/Counter";
import Subscription from "./app/pages/Subscription";


function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="form-subscripcion">
          <div className="card">
            <div className="card-body">
              <img
                className="card-media mx-auto d-block"
                src={process.env.PUBLIC_URL + '/logo IP.png'}
                alt=""
              />
              <h4 className="card-title">Subscripción de Plan de Pago</h4>
              <p className="card-description">
                Por favor ingrese el número de RTN del propietario según el
                sistema a el número de motor,VIN o Chasis
              </p>
              <hr />
              <Subscription/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
