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

async function testPostCreation() {
    const email = `post_test_${Date.now()}@example.com`;
    const nickname = `post_user_${Date.now()}`;
    const password = 'password123';

    console.log('1. Signing up user...');
    await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/signup',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email, nickname, password });

    console.log('2. Creating a post...');
    const title = 'Test Post Title';
    const content = 'This is a test post content.';

    const createRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/posts',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email, title, content });

    console.log('Create Response:', createRes.body);

    if (createRes.status !== 201) {
        console.error(`FAILURE: Expected 201 Created, got ${createRes.status}`);
        return;
    }

    console.log('SUCCESS: Post creation flow verified!');
}

testPostCreation();
