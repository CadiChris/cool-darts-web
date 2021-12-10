function getInMemoryDbAdapter() {
  return {
    storage: [],
    insert(table, columns, values) {
      this.storage.push({ table, columns, values });
    },
    truncate: jest.fn(async () => {}),
    getAll: jest.fn(async () => []),
    copy: jest.fn(async () => {}),
    transaction: (statements) => statements(),
  };
}

module.exports = { getInMemoryDbAdapter };
