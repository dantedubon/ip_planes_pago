import React from "react";
import Subscription from "./app/pages/Subscription/Subscription";
import { useSelector } from "react-redux";
import { selectLoading } from "./app/globalSlice";
import CircleLoader from "react-spinners/CircleLoader";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const load = useSelector(selectLoading);

  return (
    <Router>
      <div className="App">
        <div className="container">
          <div className="form-subscripcion">
            <div className="card">
              <div className="card-body">
                {load && (
                  <div id="overlay">
                    <div className="loader">
                      <CircleLoader
                        size={100}
                        loading={load}
                        color={"#548FD3"}
                      />
                    </div>
                  </div>
                )}
                <img
                  className="card-media mx-auto d-block"
                  src={process.env.PUBLIC_URL + "/logo IP.png"}
                  alt=""
                />
                <h4 className="card-title">Subscripción de Plan de Pago</h4>
                <p className="card-description">
                  Por favor ingrese el número de RTN del propietario según el
                  sistema a el número de motor,VIN o Chasis
                </p>
                <hr />
                <Switch>
                  <Route exact path="/">
                    <Subscription />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
