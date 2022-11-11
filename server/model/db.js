const sqlite3 = require('sqlite3');
const dataBasePath = "/home/fumiya/デスクトップ/github/nocode-AR/server/db.sqlite"
const db = new sqlite3.Database(
  dataBasePath,
  (err) => (err) ? console.error("database error: " + err.message) : console.log("Successful connection to database")
)

const dataBaseObj = {
  // For getting all data
  getAllData: (query) => new Promise((resolve, reject) => {
    db.all(query,(err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
    db.close
  }),
  // For getting one data
  getData: (query, val = []) => new Promise((resolve, reject) => {
    db.get(query, val, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
    db.close
  }),
  // For adding data
  addData: (query, val = []) => new Promise((resolve, reject) => {
    db.run(query, val, (err) => {
      if (err) {
        return reject(err)
      }
      resolve()
    });
    db.close
  }),
  // For updating data
  updateDate: (query, val = []) => new Promise((resolve, reject) => {
    db.run(query, val, (err) => {
      if (err) {
        return reject(err)
      }
      resolve()
    });
    db.close
  }),

  // For data deletion
  deleteData: (query, val = []) => new Promise((resolve, reject) => {
    db.run(query, val, (err) => {
      if (err) {
        return reject(err)
      }
      resolve()
    });
    db.close
  }),

  getAllRally: (query, val = []) => new Promise((resolve, reject) => {
    db.all(query, val,(err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
    db.close
  }),
}

module.exports = dataBaseObj;
