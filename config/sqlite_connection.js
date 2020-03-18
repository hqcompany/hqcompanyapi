const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');

class SQLiteConnection {
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, error => {
            if (error) {
                console.log('Could not connect to database ', error);
            } else {
                console.log('Connected to database.');
            }
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(error) {
                if (error) {
                    console.log('Error running sql ', sql);
                    console.log(error);
                    reject(error);
                } else {
                    // console.log(this.lastID);
                    resolve({ id: this.lastID });
                }
            });
        });
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (error, result) => {
                if (error) {
                    console.log(`Error running sql: ${sql}`);
                    console.log(error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (error, results) => {
                if (error) {
                    console.log(`Error running sql: ${sql}`);
                    console.log(error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = SQLiteConnection;
