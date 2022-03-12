const { badJson, goodJson } = require("../helpers");

const usersSQLSchema = require("../database-schema");

const badJsonWithRes = (err, code) => badJson(res, err, code);
const goodJsonWithRes = (data, code) => goodJson(res, data, code);

let mysqlConfig = {
    ...require("../config/mysql"),
    multipleStatements: true,
  };
  delete mysqlConfig.database;

const { isDevelopment } = require("../config");
const mysqlConn = require("mysql").createConnection(require("../config/mysql"));

class InsertService {
  
  //  >>>> Inserting Users  >>>>
  InsertIntoUser(params) {
    return new Promise((resolve, reject) => {
      try {
        let sql = `INSERT INTO user_tbl SET ?`,
            fillers = [params];
            mysqlConn.query(sql, fillers, function (err, rows) {
            if (err) {
              reject(err);
            }
            let user = rows;
            if (!user) {
              reject(err);
            }
            resolve(user);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
  
  //  >>>> Inserting Feeds  >>>>

  InsertIntoFeeds(params) {
    return new Promise((resolve, reject) => {
      try {
        let sql = `INSERT INTO feed_tbl SET ?`,
            fillers = [params];
            mysqlConn.query(sql, fillers, function (err, rows) {
            if (err) {
              reject(err);
            }
            let user = rows;
            if (!user) {
              reject(err);
            }
            resolve(user);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
  
  //  >>>> Inserting Feeds  >>>>

  InsertIntoInterest(params) {
    return new Promise((resolve, reject) => {
      try {
        let sql = `INSERT INTO interest_tbl SET ?`,
            fillers = [params];
            mysqlConn.query(sql, fillers, function (err, rows) {
            if (err) {
              reject(err);
            }
            let user = rows;
            if (!user) {
              reject(err);
            }
            resolve(user);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
}
module.exports = InsertService;
