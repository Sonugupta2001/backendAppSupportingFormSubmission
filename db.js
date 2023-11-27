const mysql = require("mysql2");

function establishConnection() {
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        database: 'test',
        user: 'root',
        password: '******'
    });

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database');
    });

    // Don't forget to close the connection when you're done with it
    // connection.end();

    return connection;
}

module.exports = {
    establishConnection
};

// You can now perform your database operations using the 'connection' object

// Don't forget to close the connection when you're done with it
// connection.end();
