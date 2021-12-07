import { expectSaga } from "redux-saga-test-plan";
import { catchUpOnRoomSaga, sendEverythingToSocket } from "../sagas";
import { catchUpOnRoom, inscrireCricket } from "../actions";

jest.mock("../../../env/Env");
jest.mock("../../sockets/apiWebSocket.socket");

describe("sagas du Cricket", () => {
  describe("sendEverythingToSocket", () => {
    it("renvoie toutes les actions reçues vers le socket", async () => {
      const mockSocket = { send: jest.fn() };
      await expectSaga(sendEverythingToSocket, { socket: mockSocket })
        .dispatch({ type: "UNE_ACTION" })
        .run();

      expect(mockSocket.send).toHaveBeenCalledWith({ type: "UNE_ACTION" });
    });
  });

  describe("catchUpOnRoomSaga", () => {
    it("récupère toutes les actions de la room, et les dispatch", async () => {
      const mockRoomAdapter = {
        getAllRoomActions: async () => [inscrireCricket("J1")],
      };

      await expectSaga(catchUpOnRoomSaga, {
        roomAdapter: mockRoomAdapter,
      })
        .dispatch(catchUpOnRoom())
        .put(inscrireCricket("J1")) // TODO: ajouter asLocalOnly()
        .run();
    });
  });
});
