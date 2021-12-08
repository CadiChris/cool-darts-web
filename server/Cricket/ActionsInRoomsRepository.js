class ActionsInRoomsRepository {
  constructor(dbAdapter) {
    this.dbAdapter = dbAdapter;
  }

  async cleanRoom() {
    await this.dbAdapter.truncate("actions_in_rooms");
  }

  async getAllReduxActions() {
    const rows = await this.dbAdapter.getAll(
      "actions_in_rooms",
      "action_time ASC"
    );
    return rows.map((r) => r.action);
  }

  async storeAction(room, action, time) {
    await this.dbAdapter.insert(
      "actions_in_rooms",
      ["room_name", "action", "action_time"],
      [room.name, action, time]
    );
  }
}

module.exports = {
  ActionsInRoomsRepository,
};
