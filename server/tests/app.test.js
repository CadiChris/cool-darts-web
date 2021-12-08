const request = require("supertest");
const { makeApp } = require("../app");
const actions_in_rooms = require("./data/actions_in_rooms.json");
const { getInMemoryDbAdapter } = require("../adapters/DbAdapter.inMemory");

describe("App", () => {
  describe("GET /room/clean", () => {
    it("vide la table des actions sur GET /room/clean (non RESTful, mais pratique pour l'instant)", (done) => {
      const dbAdapter = getInMemoryDbAdapter();
      const { truncate } = dbAdapter;

      request(makeApp({ dbAdapter }))
        .get("/room/clean")
        .expect(301, "Moved Permanently. Redirecting to /")
        .then(() => expect(truncate).toHaveBeenCalledWith("actions_in_rooms"))
        .then(done)
        .catch((err) => done(err));
    });
  });

  describe("GET /room/actions", () => {
    it("récupère toutes les actions d'une room sur GET /room/actions", (done) => {
      const dbAdapter = {
        ...getInMemoryDbAdapter(),
        getAll: jest.fn(async () => actions_in_rooms),
      };

      request(makeApp({ dbAdapter }))
        .get("/room/actions")
        .expect(200, [{ type: "CRICKET/INSCRIRE_CRICKET", joueur: "Olive" }])
        .then(() =>
          expect(dbAdapter.getAll).toHaveBeenCalledWith(
            "actions_in_rooms",
            "action_time ASC"
          )
        )
        .then(done);
    });
  });
});
