const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);

db.all("SELECT id, name, category, address, latitude, longitude FROM place", [], (err, rows) => {
    if (err) {
        console.error("Error querying places:", err);
        return;
    }
    console.log('All Places:');
    rows.forEach(row => {
        console.log(`[${row.id}] ${row.name} (${row.category}) - ${row.address} (Lat: ${row.latitude}, Lng: ${row.longitude})`);
    });
});

db.close();
