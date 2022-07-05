// Main Module
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'example.org',
    user: 'ford',
    password: 'secret',
    database: 'forddb',
});
pool.connect();

// Module A
pool.query(query, function (error, results, fields) {
    if (error) throw error;
    console.log("The solution is: ", results[0].solution);
});

// Module B
pool.query(query, function (error, results, fields) {
    if (error) throw errer;
    console.log("The solution is:", results[0].solution);
});
