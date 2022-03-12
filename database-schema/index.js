const { database } = require("../config/mysql");
// const { buyerTable, sellerTable
//         } = require("../config");

module.exports = `
CREATE DATABASE IF NOT EXISTS ${database} CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';
USE ${database};
CREATE TABLE IF NOT EXISTS user_tbl (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(225) NOT NULL,
    lastname VARCHAR(225) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(225) NOT NULL,
    sex SET('male','female') DEFAULT '',
    phone_no VARCHAR(23) DEFAULT '',
    date_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modified_last TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT unique_user UNIQUE (email)
);
CREATE TABLE IF NOT EXISTS feed_tbl (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(80) NOT NULL,
    title VARCHAR(225) NOT NULL,
    description VARCHAR(225) DEFAULT '',
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS interest_tbl (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(80) NOT NULL,
    interest VARCHAR(225) NOT NULL,
    PRIMARY KEY (id)
);`;
