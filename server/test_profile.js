const http = require('http');

function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    resolve(body);
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

async function testProfile() {
    const email = `profile_test_${Date.now()}@example.com`;
    const nickname = `profile_user_${Date.now()}`;
    const password = 'password123';

    console.log(`1. Signing up user: ${email}`);
    await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/signup',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email, nickname, password });

    console.log('2. Updating profile...');
    const location = 'Seoul, Korea';
    const introduction = 'Hello, this is a test introduction.';

    const updateRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/profile',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email, location, introduction });

    console.log('Update Response:', updateRes);

    if (updateRes.user.location !== location || updateRes.user.introduction !== introduction) {
        console.error('FAILURE: Profile fields not updated correctly');
        return;
    }

    console.log('3. Logging in to verify persistence...');
    const loginRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email, password });

    console.log('Login Response User:', loginRes.user);

    if (loginRes.user.location !== location || loginRes.user.introduction !== introduction) {
        console.error('FAILURE: Profile fields not persisted correctly');
        return;
    }

    console.log('SUCCESS: Profile update flow verified!');
}

testProfile();
