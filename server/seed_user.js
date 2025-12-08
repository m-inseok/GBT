const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
console.log('Opening database at:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to the SQLite database.');
});

db.serialize(() => {
    const stmt = db.prepare("INSERT INTO user (email, nickname, password) VALUES (?, ?, ?)");
    stmt.run("manual@test.com", "ManualUser", "password123", function (err) {
        if (err) {
            console.error('Error inserting user:', err.message);
        } else {
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
    });
    stmt.finalize();

    db.all("SELECT * FROM user", [], (err, rows) => {
        if (err) {
            console.error('Error selecting users:', err.message);
            return;
        }
        console.log('Users in DB:', rows);
    });
});

db.close();
