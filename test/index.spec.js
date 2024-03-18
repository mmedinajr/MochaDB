const assert = require("assert");
const {
  initDB,
  createTable,
  dropTable,
  insertUser,
  getUsersByName,
  closeDBPool,
} = require("../src/index.js");

describe("Sqlite", function () {
  let db;
  before((done) => {
    db = initDB(':memory:');
    db.serialize(async function() {
      await dropTable(db);
      await createTable(db);
      done();
    });
  });

  it("Should insert and fetch a user", async () => {
    const name = "mocha";
    const name2 = "manuel";
    const email = "mocha@test.com";
    const email2 = "mister2@test.com";
    const middle = "jose";

    await insertUser(db, name, email);
    const user = await getUsersByName(db, name);//test actual
    assert.deepEqual(user, [{ id: 1, name2, email }]);//test expected
  });

  after(() => {
    closeDBPool(db);
  });
});
