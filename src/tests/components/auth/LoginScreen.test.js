import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import "@testing-library/jest-dom";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { starRegister, startLogin } from "../../../actions/auth";
import Swal from "sweetalert2";

jest.mock("../../../actions/auth", () => ({
  startLogin: jest.fn(),
  starRegister: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe("Pruebas en <LoginScreen/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe llamar el dispatch del Login", () => {
    wrapper.find('input[name="lEmail"]').simulate("change", {
      target: {
        name: "lEmail",
        value: "pedro@gmail.com",
      },
    });

    wrapper.find('input[name="lPassword"]').simulate("change", {
      target: {
        name: "lPassword",
        value: "123456",
      },
    });

    wrapper.find("form").at(0).prop("onSubmit")({
      preventDefault() {},
    });

    expect(startLogin).toHaveBeenCalledWith("pedro@gmail.com", "123456");
  });

  test("No hay registro si los passwords son diferentes", () => {
    wrapper.find('input[name="rPassword"]').simulate("change", {
      target: {
        name: "rPassword",
        value: "123456",
      },
    });
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: "1234567",
      },
    });
    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });
    expect(starRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Las contraseñas deben ser iguales",
      "error"
    );
  });

  test("Debe hacer dispatch el starRegister con los passwords iguales", () => {
    wrapper.find('input[name="rPassword"]').simulate("change", {
      target: {
        name: "rPassword",
        value: "123456",
      },
    });
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: "123456",
      },
    });
    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });
    expect(Swal.fire).not.toHaveBeenCalled();
    expect(starRegister).toHaveBeenCalled();
  });
});
