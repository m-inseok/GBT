const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
console.log('DB_PATH:', dbPath);

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) console.error(err.message);
});

db.serialize(() => {
    db.all("SELECT email FROM user", [], (err, rows) => {
        if (err) {
            console.log('ERROR:', err.message);
            return;
        }
        console.log('EMAILS_START');
        rows.forEach(r => console.log(r.email));
        console.log('EMAILS_END');
    });
});

db.close();
