const { log } = require("./log");

class Lobby {
  _joueurs = [];

  joinRoom(joueur, nomDeLaSalle) {
    log("Nouveau joueur dans la salle " + nomDeLaSalle);
    joueur.joinRoom({ name: nomDeLaSalle });
    this._joueurs = [...this._joueurs, joueur];
  }

  jouer(joueur, action) {
    this._joueurs
      .filter((j) => j !== joueur)
      .filter((j) => j.estDansLaRoom(joueur.room()))
      .forEach((autre) => autre.prevenir(action));
  }
}

class Joueur {
  constructor({ socket }) {
    this._socket = socket;
  }

  joinRoom(room) {
    this._room = room;
  }

  room = () => this._room;
  estDansLaRoom = (room) => this._room.name === room.name;

  prevenir(action) {
    this._socket.send(action);
  }
}

module.exports = { Lobby, Joueur };
