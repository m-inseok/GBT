const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);

db.all("SELECT email, isSubscribed FROM user", [], (err, rows) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('User Data:');
    console.log(rows);
});

db.close();
