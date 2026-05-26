const request = require('supertest');
const { app, db } = require('./server');

// Đánh lừa hệ thống: Giả lập toàn bộ các hàm xử lý của thư viện MySQL
jest.spyOn(db, 'query').mockImplementation((queryStr, values, callback) => {
    // Nếu là lệnh callback truyền thẳng không có tham số values (như lệnh SELECT)
    const cb = typeof values === 'function' ? values : callback;

    if (queryStr.includes('SELECT * FROM product')) {
        return cb(null, [{ product_id: 1, product_name: 'Test Product', quantity: 10, price: 100 }]);
    }
    if (queryStr.includes('SELECT 1')) {
        return cb(null, [{ 1: 1 }]); // Giả lập DB sống cho Readiness Probe
    }
    return cb(null, { insertId: 99 });
});

afterAll(done => {
    db.end(); // Ngắt kết nối dọn dẹp bộ nhớ máy ảo sau khi test xong
    done();
});

describe('=== CI CHECK: AUTOMATED ENDPOINT TESTING ===', () => {

    it('Mục tiêu 1: Kiểm tra xem Endpoint /healthz có hoạt động không', async () => {
        const res = await request(app).get('/healthz');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('UP');
    });

    it('Mục tiêu 2: Kiểm tra xem Endpoint /ready (Check DB) có hoạt động không', async () => {
        const res = await request(app).get('/ready');
        expect(res.statusCode).toEqual(200);
    });

    it('Mục tiêu 3: Kiểm tra API lấy danh sách sản phẩm', async () => {
        const res = await request(app).get('/products');
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].product_name).toEqual('Test Product');
    });
});
