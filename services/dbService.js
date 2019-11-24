const oracledb = require('oracledb');
const dbConfig = require('../config/dbConfig.js');

// initialize oracle connection pool
async function initialize() {
  const pool = await oracledb.createPool(dbConfig.conPool);
}

// closes the oracle connection and release from pool
async function close() {
  await oracledb.getPool().close();
}

// to perform DB operation
function simpleExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      conn = await oracledb.getConnection();

      const result = await conn.execute(statement, binds, opts);

      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

// to perform DB operation
function simpleExecuteMany(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      conn = await oracledb.getConnection();

      const result = await conn.executeMany(statement, binds, opts);

      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

module.exports.initialize = initialize;
module.exports.close = close;
module.exports.simpleExecute = simpleExecute;
module.exports.simpleExecuteMany = simpleExecuteMany;