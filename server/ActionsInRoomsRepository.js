class ActionsInRoomsRepository {
  constructor(dbAdapter) {
    this.dbAdapter = dbAdapter;
  }

  async cleanRoom() {
    await this.dbAdapter.truncate("actions_in_rooms");
  }
}

module.exports = {
  ActionsInRoomsRepository,
};
