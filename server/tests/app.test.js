const request = require("supertest");
const { app } = require("../app");
const { Adapters } = require("../adapters/adapters");
const actions_in_rooms = require("./data/actions_in_rooms.json");

describe("App", () => {
  beforeEach(() => {
    Adapters.DbAdapter = {
      truncate: jest.fn(async () => {}),
      getAll: jest.fn(async () => []),
    };
  });

  describe("POST /room/clean", () => {
    it("vide la table des actions sur POST /room/clean", (done) => {
      const { truncate } = Adapters.DbAdapter;

      request(app)
        .post("/room/clean")
        .expect(200)
        .then(() => expect(truncate).toHaveBeenCalledWith("actions_in_rooms"))
        .then(done)
        .catch((err) => done(err));
    });
  });

  describe("GET /room/actions", () => {
    it("récupère toutes les actions d'une room sur GET /room/actions", (done) => {
      Adapters.DbAdapter.getAll = jest.fn(async () => actions_in_rooms);
      const { getAll } = Adapters.DbAdapter;

      request(app)
        .get("/room/actions")
        .expect(200, [{ type: "CRICKET/INSCRIRE_CRICKET", joueur: "Olive" }])
        .then(() =>
          expect(getAll).toHaveBeenCalledWith(
            "actions_in_rooms",
            "action_time ASC"
          )
        )
        .then(done);
    });
  });
});
