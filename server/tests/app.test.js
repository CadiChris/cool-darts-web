const request = require("supertest");
const { app } = require("../app");
const { Adapters } = require("../adapters");

describe("App", () => {
  beforeEach(() => {
    Adapters.DbAdapter = { truncate: jest.fn(async () => {}) };
  });

  it("vide la table des actions sur POST /room/clean", (done) => {
    request(app)
      .post("/room/clean")
      .expect(200)
      .then(() => {
        expect(Adapters.DbAdapter.truncate).toHaveBeenCalledWith(
          "actions_in_rooms"
        );
      })
      .then(done)
      .catch((err) => done(err));
  });
});
