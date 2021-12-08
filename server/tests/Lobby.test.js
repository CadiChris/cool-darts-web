const { Lobby, Joueur } = require("../Lobby");
const { ActionsInRoomsRepository } = require("../ActionsInRoomsRepository");
const { Clock } = require("../Clock");
const { getInMemoryDbAdapter } = require("../adapters/DbAdapter.inMemory");

describe("Lobby", () => {
  it("Un joueur qui rejoint une salle connaît sa salle", () => {
    const { lobby } = createLobby();
    const j1 = new Joueur({});

    lobby.joinRoom(j1, "Room A");

    expect(j1.room()).toEqual({ name: "Room A" });
  });

  it("Un joueur peut être prévenu d'un coup via son socket", () => {
    const mockSocket = { send: jest.fn() };
    const j1 = new Joueur({ socket: mockSocket });

    j1.prevenir({ type: "LANCER" });

    expect(mockSocket.send).toHaveBeenCalledWith({ type: "LANCER" });
  });

  it("Quand un joueur joue, les autres joueurs de la salle sont prévenus", async () => {
    const { lobby } = createLobby();

    const socket1 = { send: jest.fn() };
    const j1 = new Joueur({ socket: socket1 });
    lobby.joinRoom(j1, "Room A");

    const socket2 = { send: jest.fn() };
    const j2 = new Joueur({ socket: socket2 });
    lobby.joinRoom(j2, "Room A");

    await lobby.jouer(j1, { type: "LANCER" });

    expect(socket2.send).toHaveBeenCalledWith({ type: "LANCER" });
    expect(socket1.send).not.toHaveBeenCalled();
  });

  it("Persiste les coups joués par les joueurs", async () => {
    Clock.now = () => "2021-12-08T22:40:02.193Z";
    const { lobby, inMemoryDb } = createLobby();
    const j1 = new Joueur({});
    lobby.joinRoom(j1, "Room A");

    await lobby.jouer(j1, { type: "LANCER" });

    expect(inMemoryDb.storage).toContainEqual({
      table: "actions_in_rooms",
      columns: ["room_name", "action", "action_time"],
      values: ["Room A", { type: "LANCER" }, "2021-12-08T22:40:02.193Z"],
    });
  });
});

function createLobby() {
  const inMemoryDb = getInMemoryDbAdapter();
  const repository = new ActionsInRoomsRepository(inMemoryDb);
  const lobby = new Lobby({ actionsInRoomsRepository: repository });
  return { lobby, inMemoryDb };
}
