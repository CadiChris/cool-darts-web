class ActionsInRoomsRepository {
  constructor(dbAdapter) {
    this.dbAdapter = dbAdapter;
  }

  async cleanRoom() {
    await this.dbAdapter.truncate("actions_in_rooms");
  }

  async getAllReduxActions() {
    const rows = await this.dbAdapter.getAll("actions_in_rooms");
    return rows.map((r) => r.action);
  }

  async storeAction(action) {
    await this.dbAdapter.insert(
      "actions_in_rooms",
      ["room_name", "action", "action_time"],
      ["", action, new Date()]
    );
  }
}

module.exports = {
  ActionsInRoomsRepository,
};
