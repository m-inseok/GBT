const http = require('http');

function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, body: JSON.parse(body) });
                } catch (e) {
                    resolve({ status: res.statusCode, body });
                }
            });
        });
        req.on('error', reject);
        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function testNickname() {
    const email1 = `nick_test1_${Date.now()}@example.com`;
    const nickname1 = `nick_user1_${Date.now()}`;
    const email2 = `nick_test2_${Date.now()}@example.com`;
    const nickname2 = `nick_user2_${Date.now()}`;
    const password = 'password123';

    console.log('1. Signing up two users...');
    await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/signup',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email: email1, nickname: nickname1, password });

    await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/signup',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email: email2, nickname: nickname2, password });

    console.log('2. Updating nickname1 to a new unique nickname...');
    const newNickname = `new_nick_${Date.now()}`;
    const updateRes1 = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/profile',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email: email1, nickname: newNickname });

    console.log('Update 1 Response:', updateRes1.body);
    if (updateRes1.body.user.nickname !== newNickname) {
        console.error('FAILURE: Nickname not updated correctly');
        return;
    }

    console.log('3. Attempting to update nickname1 to nickname2 (duplicate)...');
    const updateRes2 = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/profile',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email: email1, nickname: nickname2 });

    console.log('Update 2 Response:', updateRes2.body);
    if (updateRes2.status !== 409) {
        console.error(`FAILURE: Should have failed with 409, got ${updateRes2.status}`);
        return;
    }

    console.log('SUCCESS: Nickname update flow verified!');
}

testNickname();
