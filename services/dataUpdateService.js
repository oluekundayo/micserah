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

class UpdateService {
  
  //  >>>> Update User  >>>>

    updateUserByEmail(params, payload) {
        return new Promise((resolve, reject) => {
          try {
            mysqlConn.query(
              "UPDATE ?? SET ? WHERE ?? = ?",
              ['user_tbl', payload, "email", params],
              function (err, rows) {
                if (err) {
                  reject(err);
                }
                let user = rows;
                if (!user) {
                  reject(err);
                }
                resolve(user);
              }
            );
          } catch (err) {
            reject(err);
          }
        });
    }
  
  //  >>>> Update Feed  >>>>

  updateFeedById(params, payload) {
    return new Promise((resolve, reject) => {
      try {
        mysqlConn.query(
          "UPDATE ?? SET ? WHERE ?? = ?",
          ['feed_tbl', payload, "id", params],
          function (err, rows) {
            if (err) {
              reject(err);
            }
            let user = rows;
            if (!user) {
              reject(err);
            }
            resolve(user);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  
  //  >>>> Update Interest  >>>>

  updateInterestById(params, payload) {
    return new Promise((resolve, reject) => {
      try {
        mysqlConn.query(
          "UPDATE ?? SET ? WHERE ?? = ?",
          ['interest_tbl', payload, "id", params],
          function (err, rows) {
            if (err) {
              reject(err);
            }
            let user = rows;
            if (!user) {
              reject(err);
            }
            resolve(user);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }
}
module.exports = UpdateService;
