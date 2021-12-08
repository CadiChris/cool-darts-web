const { Lobby, Joueur } = require("../Lobby");

describe("Cricket", () => {
  it("Un joueur qui rejoint une salle connaît sa salle", () => {
    const lobby = new Lobby();
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

  it("Quand un joueur joue dans une salle, les autres joueurs sont prévenus", () => {
    const lobby = new Lobby();

    const socket1 = { send: jest.fn() };
    const j1 = new Joueur({ socket: socket1 });
    lobby.joinRoom(j1, "Room A");

    const socket2 = { send: jest.fn() };
    const j2 = new Joueur({ socket: socket2 });
    lobby.joinRoom(j2, "Room A");

    lobby.jouer(j1, { type: "LANCER" });

    expect(socket2.send).toHaveBeenCalledWith({ type: "LANCER" });
    expect(socket1.send).not.toHaveBeenCalled();
  });
});
