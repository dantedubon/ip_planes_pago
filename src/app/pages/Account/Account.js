import React from "react";
import { useSelector } from "react-redux";
import { selectClientData } from "../Subscription/subscriptionSlice";
import { ListGroup } from "react-bootstrap";

const Account = () => {
  const { placa, propietario, estadoCuenta } = useSelector(selectClientData);
  console.log(placa);

  return (
    <ListGroup variant="flush">
      <ListGroup.Item className= "list-item">
         <strong>Placa:</strong> {placa}
          </ListGroup.Item>
      <ListGroup.Item className= "list-item">
          <strong>Propietario:</strong> {propietario}</ListGroup.Item>
    </ListGroup>
  );
};

export default Account;
