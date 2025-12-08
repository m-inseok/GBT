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

async function testSortingAndLikes() {
    const email = `sort_test_${Date.now()}@example.com`;
    const nickname = `sort_user_${Date.now()}`;
    const password = 'password123';

    console.log('1. Signing up user...');
    await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/signup',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { email, nickname, password });

    console.log('2. Creating posts...');
    const posts = [];
    for (let i = 1; i <= 3; i++) {
        const res = await request({
            hostname: 'localhost',
            port: 3000,
            path: '/posts',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, { email, title: `Post ${i}`, content: `Content ${i}` });
        posts.push(res.body.post);
    }

    console.log('3. Liking Post 1 twice...');
    await request({
        hostname: 'localhost',
        port: 3000,
        path: `/posts/${posts[0].id}/like`,
        method: 'POST',
    });
    await request({
        hostname: 'localhost',
        port: 3000,
        path: `/posts/${posts[0].id}/like`,
        method: 'POST',
    });

    console.log('4. Fetching Popular posts...');
    const popularRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/posts?sort=popular',
        method: 'GET',
    });

    console.log('Popular Posts:', popularRes.body.map(p => ({ id: p.id, likes: p.likes })));
    if (popularRes.body[0].id !== posts[0].id || popularRes.body[0].likes !== 2) {
        console.error('FAILURE: Popular sort incorrect');
        return;
    }

    console.log('5. Fetching Latest posts...');
    const latestRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/posts?sort=latest',
        method: 'GET',
    });

    console.log('Latest Posts:', latestRes.body.map(p => ({ id: p.id, createdAt: p.createdAt })));
    if (latestRes.body[0].id !== posts[2].id) {
        console.error('FAILURE: Latest sort incorrect');
        return;
    }

    console.log('SUCCESS: Sorting and Likes verified!');
}

testSortingAndLikes();
