import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";

import "@testing-library/jest-dom";

import { starRegister, startChecking, startLogin } from "../../actions/auth";
import { types } from "../../types/types";
import * as fetchModule from "../../helpers/fetch";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe("Pruebas en las actions auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("startLogin correcto", async () => {
    await store.dispatch(startLogin("calillo11@hotmail.com", "123456"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
    // token = localStorage.setItem.mock.calls[0][1];
  });

  test("startLogin incorrecto", async () => {
    await store.dispatch(startLogin("calillo11@hotmail.com", "1234567"));
    let actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Password incorrecto",
      "error"
    );

    await store.dispatch(startLogin("calillo1@hotmail.com", "123456"));
    actions = store.getActions();

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "El usuario no existe",
      "error"
    );
  });

  test("startRegister correcto", async () => {
    //mockear el fetchSinToken
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "test2",
          token: "ABC123ABC123",
        };
      },
    }));

    await store.dispatch(starRegister("Test", "test@test.com", "123456"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "test2",
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABC123ABC123");

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startChecking correcto", async () => {
    //mockear el fetchSinToken
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "test2",
          token: "ABC123ABC123",
        };
      },
    }));

    await store.dispatch(startChecking());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "test2",
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABC123ABC123");
  });
});
