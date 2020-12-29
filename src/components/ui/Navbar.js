import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">
        <img
          src="https://creativitics.net/wp-content/uploads/cropped-Icono-CreativiTICs.png"
          alt="Creativitics Icon"
          width="40"
          height="40"
        />
        alendar App
      </span>
      <h3 className="name-navbar">{name}</h3>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span> Salir</span>
      </button>
    </div>
  );
};
