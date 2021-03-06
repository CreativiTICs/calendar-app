import { types } from "../../types/types";

describe("Pruebas en los Types", () => {
  test("Deben de ser los types correctos", () => {
    expect(types).toEqual({
      uiOpenModal: "[ui] Open modal",
      uiCloseModal: "[ui] Close modal",

      eventSetActive: "[event] Set Active",
      eventLogout: "[event] Logout event",
      eventStartAddNew: "[event] Start add new",
      eventAddNew: "[event] Add new",
      eventClearActiveEvent: "[event] Clear active event",
      eventUpdated: "[event] Event updated",
      eventDeleted: "[event] Event deleted",
      eventLoaded: "[event] Events loaded",

      authCheckingFinish: "[auth] Finish checking login state",
      authStartLogin: "[auth] Start Login",
      authLogin: "[auth] Login",
      authStartRegister: "[auth] Start Register",
      authStartTokenRenew: "[auth] Start Token Renew",
      authLogout: "[auth] Logout",
    });
  });
});
