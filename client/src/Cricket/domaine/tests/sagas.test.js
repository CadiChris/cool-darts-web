import { expectSaga } from "redux-saga-test-plan";
import { sendEverythingToSocket } from "../sagas";

jest.mock("../../../env/Env");
jest.mock("../../sockets/apiWebSocket.socket");

describe("sagas du Cricket", () => {
  it("renvoie toutes les actions reçues vers le socket", async () => {
    const mockSocket = { send: jest.fn() };
    await expectSaga(sendEverythingToSocket, { socket: mockSocket })
      .dispatch({ type: "UNE_ACTION" })
      .run();

    expect(mockSocket.send).toHaveBeenCalledWith({ type: "UNE_ACTION" });
  });
});
