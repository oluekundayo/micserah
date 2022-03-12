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

class DeleteService {
  
    //  >>>> Delete User  >>>>

    deleteUserById(params) {
        return new Promise((resolve, reject) => {
          try {
            mysqlConn.query(
                "DELETE FROM ?? WHERE ?? = ?",
                ["user_tbl", "id", params],
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
    
    //  >>>> Delete Feed  >>>>
    
    deleteFeedById(params) {
        return new Promise((resolve, reject) => {
            try {
            mysqlConn.query(
                "DELETE FROM ?? WHERE ?? = ?",
                ["feed_tbl", "id", params],
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
    
    //  >>>> Delete Interest  >>>>
    
    deleteInterestById(params) {
        return new Promise((resolve, reject) => {
            try {
            mysqlConn.query(
                "DELETE FROM ?? WHERE ?? = ?",
                ["interest_tbl", "id", params],
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
module.exports = DeleteService;
