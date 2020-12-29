import { fetchConToken, fetchSinToken } from "../../helpers/fetch";

describe("Pruebas en el Helper Fetch", () => {
  let token = "";

  test("fetchSinToken debe funcionar", async () => {
    const resp = await fetchSinToken(
      "auth",
      { email: "calillo11@hotmail.com", password: "123456" },
      "POST"
    );
    expect(resp instanceof Response).toBe(true);

    const body = await resp.json();
    expect(body.ok).toBe(true);

    token = body.token;
  });

  test("fetchConToken debe funcionar", async () => {
    localStorage.setItem("token", token);

    const resp = await fetchConToken(
      "events/5fea6686c4203b38c478d01d",
      {},
      "DELETE"
    );
    const body = await resp.json();

    expect(body.msg).toBe("Evento no existe con ese id");
  });
});
