class ActionsInRoomsRepository {
  constructor(dbAdapter) {
    this.dbAdapter = dbAdapter;
  }

  cleanRoom() {
    this.dbAdapter.truncate("actions_in_rooms");
  }
}

module.exports = {
  ActionsInRoomsRepository,
};
