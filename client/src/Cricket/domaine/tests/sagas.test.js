import { expectSaga } from "redux-saga-test-plan";
import { catchUpOnRoomSaga, sendEverythingToSocket } from "../sagas";
import { asLocalOnly, catchUpOnRoom, inscrireCricket } from "../actions";

jest.mock("../../../env/Env");
jest.mock("../../sockets/apiWebSocket.socket");

describe("sagas du Cricket", () => {
  describe("sendEverythingToSocket", () => {
    it("envoie toutes les actions reçues vers le socket", async () => {
      const mockSocket = { send: jest.fn() };
      await expectSaga(sendEverythingToSocket, { socket: mockSocket })
        .dispatch({ type: "UNE_ACTION" })
        .run();

      expect(mockSocket.send).toHaveBeenCalledWith({ type: "UNE_ACTION" });
    });

    it("n'envoie pas les actions marquées comme 'localOnly'", async () => {
      const mockSocket = { send: jest.fn() };
      await expectSaga(sendEverythingToSocket, { socket: mockSocket })
        .dispatch(asLocalOnly({ type: "UNE_ACTION" }))
        .run();

      expect(mockSocket.send).not.toHaveBeenCalled();
    });
  });

  describe("catchUpOnRoomSaga", () => {
    it("récupère toutes les actions de la room, et les dispatch comme 'localOnly' pour éviter la boucle infinie de web-socket", async () => {
      const mockRoomAdapter = {
        getAllRoomActions: async () => [inscrireCricket("J1")],
      };

      await expectSaga(catchUpOnRoomSaga, {
        roomAdapter: mockRoomAdapter,
      })
        .dispatch(catchUpOnRoom())
        .put(asLocalOnly(inscrireCricket("J1")))
        .run();
    });
  });
});
