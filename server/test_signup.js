const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
console.log('Checking DB at:', dbPath);

function testSignup() {
    const email = `test_${Date.now()}@example.com`;
    const nickname = `user_${Date.now()}`;
    const password = 'password123';
    const postData = JSON.stringify({ email, nickname, password });

    console.log(`Attempting signup with: ${email}`);

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/auth/signup',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            console.log('Signup Response:', data);
            try {
                const parsed = JSON.parse(data);
                if (parsed.success) {
                    console.log('Signup successful, checking database...');
                    checkDatabase(email);
                } else {
                    console.error('Signup failed:', parsed);
                }
            } catch (e) {
                console.error('Failed to parse response:', e);
            }
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
}

function checkDatabase(expectedEmail) {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error('Error opening DB:', err.message);
            return;
        }
    });

    db.get("SELECT * FROM user WHERE email = ?", [expectedEmail], (err, row) => {
        if (err) {
            console.error('Query error:', err.message);
        } else if (row) {
            console.log('SUCCESS: User found in database:', row);
        } else {
            console.error('FAILURE: User NOT found in database!');
        }
        db.close();
    });
}

testSignup();
