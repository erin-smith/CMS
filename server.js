const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "ByenBye84!",
        database: "cms_DB"
    });

connection.c = util.promisify(connection.connect);
connection.q = util.promisify(connection.query);

module.exports = connection;
