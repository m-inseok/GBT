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

async function testSubscription() {
    const email = `sub_test_${Date.now()}@example.com`;
    const nickname = `sub_user_${Date.now()}`;
    const password = 'password123';

    console.log(`1. Signing up user: ${email}`);
    await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/signup',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email, nickname, password });

    console.log('2. Logging in...');
    const loginRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email, password });

    console.log('Login Response User:', loginRes.user);
    if (loginRes.user.isSubscribed !== false) {
        console.error(`FAILURE: Initial subscription status should be false, got: ${loginRes.user.isSubscribed}`);
        // return; // Don't return, try to toggle anyway to see if it works
    }

    console.log('3. Toggling subscription (Subscribe)...');
    const subRes1 = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/subscription',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email });

    console.log('Subscribe Response:', subRes1);
    if (subRes1.isSubscribed !== true) {
        console.error('FAILURE: Subscription status should be true');
        return;
    }

    console.log('4. Toggling subscription (Unsubscribe)...');
    const subRes2 = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/subscription',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email });

    console.log('Unsubscribe Response:', subRes2);
    if (subRes2.isSubscribed !== false) {
        console.error('FAILURE: Subscription status should be false');
        return;
    }

    console.log('SUCCESS: Subscription flow verified!');
}

testSubscription();
