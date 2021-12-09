import { inscrireCricket } from "../../domaine/actions";
import { roomAdapterApi } from "../roomAdapter.api";

jest.mock("../../../env/Env");

describe("Room Adapter API", () => {
  describe("getAllRoomActions", () => {
    it("appelle l'API", async () => {
      const httpMock = { get: jest.fn(async () => []) };

      await roomAdapterApi.getAllRoomActions({ http: httpMock });

      expect(httpMock.get).toHaveBeenCalledWith("/room/actions");
    });

    it("renvoie les actions récupérées", async () => {
      const http = { get: async () => [inscrireCricket("J1")] };

      const actions = await roomAdapterApi.getAllRoomActions({ http });

      expect(actions).toEqual([inscrireCricket("J1")]);
    });
  });

  describe("cleanRoom", () => {
    it("appelle l'API", async () => {
      const httpMock = { post: jest.fn(async () => {}) };

      await roomAdapterApi.cleanRoom({ http: httpMock });

      expect(httpMock.post).toHaveBeenCalledWith("/room/clean");
    });
  });
});
