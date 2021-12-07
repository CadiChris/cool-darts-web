class ActionsInRoomsRepository {
  constructor(dbAdapter) {
    this.dbAdapter = dbAdapter;
  }

  async cleanRoom() {
    await this.dbAdapter.truncate("actions_in_rooms");
  }

  async getAllReduxActions() {
    const rows = await this.dbAdapter.getAll("actions_in_rooms");
    return rows.map((r) => JSON.parse(r.action));
  }
}

module.exports = {
  ActionsInRoomsRepository,
};
