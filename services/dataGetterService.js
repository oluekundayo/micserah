const { badJson, goodJson } = require("../helpers");

const badJsonWithRes = (err, code) => badJson(res, err, code);
  const goodJsonWithRes = (data, code) => goodJson(res, data, code);
  const usersSQLSchema = require("../database-schema");


  const { isDevelopment } = require("../config");
  // const mysqlConn = require("mysql").createConnection(
  //   require("../config/mysql")
  // );
  let mysqlConfig = {
    ...require("../config/mysql"),
    multipleStatements: true,
  };
  delete mysqlConfig.database;

  const mysqlConn = require("mysql").createConnection(mysqlConfig);

  // const mysqlError = (error, code = 500) => {
  //   mysqlConn.end();
  //   badJsonWithRes(error, code);
  // };

class GetterService {

  //  >>>> User Data  >>>>

  findUserById(params) {
      return new Promise((resolve, reject) => {
      try {
    
        mysqlConn.query(usersSQLSchema, (err, res) => {
          if (err)
          reject(err);
          let sql = `SELECT * FROM ??`,
          wheres = ["?? = ?"],
          fillers = ["user_tbl", "id", params];
      
          
          sql += ` WHERE (${wheres.join(") AND (")})`;
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
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  findUserByEmail(params) {
      return new Promise((resolve, reject) => {
      try {
    
        mysqlConn.query(usersSQLSchema, (err, res) => {
          if (err)
          reject(err);
    
            let sql = `SELECT * FROM ??`,
            wheres = ["?? = ?"],
            fillers = ["user_tbl", "email", params];
        
            
            sql += ` WHERE (${wheres.join(") AND (")})`;
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
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  //  >>>> Feed sheelve  >>>>

  findAllFeeds() {
      return new Promise((resolve, reject) => {
      try {
        mysqlConn.query(usersSQLSchema, (err, res) => {
          if (err)
          reject(err);
          mysqlConn.query(`SELECT * FROM feed_tbl`, function (err, rows) {
            if (err) {
              reject(err);
            }
            let user = rows;
            if (!user) {
              reject(err);
            }
            resolve(user);
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  findFeedById(params) {
      return new Promise((resolve, reject) => {
      try {
        mysqlConn.query(usersSQLSchema, (err, res) => {
          if (err)
          reject(err);
          let sql = `SELECT * FROM ??`,
          wheres = ["?? = ?"],
          fillers = ["feed_tbl", "user_id", params];
      
          
          sql += ` WHERE (${wheres.join(") AND (")})`;
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
        });
      } catch (err) {
        reject(err);
      }
    });
  }


  //  >>>> Interest  >>>>

  findAllInterest() {
    return new Promise((resolve, reject) => {
    try {
      mysqlConn.query(usersSQLSchema, (err, res) => {
        if (err)
        reject(err);
        mysqlConn.query(`SELECT * FROM interest_tbl`, function (err, rows) {
          if (err) {
            reject(err);
          }
          let user = rows;
          if (!user) {
            reject(err);
          }
          resolve(user);
        });
      });
    } catch (err) {
      reject(err);
    }
  });
}

findInterestById(params) {
    return new Promise((resolve, reject) => {
    try {
      mysqlConn.query(usersSQLSchema, (err, res) => {
        if (err)
        reject(err);
        let sql = `SELECT * FROM ??`,
        wheres = ["?? = ?"],
        fillers = ["interest_tbl", "id", params];
    
        
        sql += ` WHERE (${wheres.join(") AND (")})`;
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
      });
    } catch (err) {
      reject(err);
    }
  });
}
}
module.exports = GetterService;