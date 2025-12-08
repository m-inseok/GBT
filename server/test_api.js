const http = require('http');

function postRequest(path, data) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                resolve({ status: res.statusCode, body: body });
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.write(data);
        req.end();
    });
}

async function testManualLogin() {
    console.log('\nTesting Manual Login (manual@test.com)...');
    const email = 'manual@test.com';
    const password = 'password123';

    try {
        const res = await postRequest('/auth/login', JSON.stringify({ email, password }));
        console.log('Manual Login Status:', res.status);
        if (res.status === 201 || res.status === 200) {
            console.log('Manual Login Success!');
        } else {
            console.log('Manual Login Failed Body:', res.body);
        }
    } catch (err) {
        console.error('Manual Login Error:', err.message);
    }
}

async function testFlow() {
    console.log('\nTesting Full Flow (Signup -> Login)...');
    const email = `flow_${Date.now()}@example.com`;
    const password = 'password123';
    const nickname = `flow_${Date.now()}`;

    // 1. Signup
    console.log(`1. Signing up ${email}...`);
    try {
        const res = await postRequest('/auth/signup', JSON.stringify({ email, nickname, password }));
        console.log('Signup Status:', res.status);
        if (res.status !== 201) {
            console.log('Signup Failed Body:', res.body);
            return;
        }
    } catch (err) {
        console.error('Signup Error:', err.message);
        return;
    }

    // 2. Login
    console.log(`2. Logging in ${email}...`);
    try {
        const res = await postRequest('/auth/login', JSON.stringify({ email, password }));
        console.log('Login Status:', res.status);
        if (res.status === 201 || res.status === 200) {
            console.log('Login Success! Token:', JSON.parse(res.body).accessToken ? 'Present' : 'Missing');
        } else {
            console.log('Login Failed Body:', res.body);
        }
    } catch (err) {
        console.error('Login Error:', err.message);
    }
}

(async () => {
    await testManualLogin();
    await testFlow();
})();
