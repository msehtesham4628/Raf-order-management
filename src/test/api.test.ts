import { describe, it, expect, vi } from 'vitest';
import { GET as getMenu } from '@/app/api/menu/route';
import { POST as placeOrder } from '@/app/api/orders/route';

describe('API Endpoints', () => {
    it('should fetch the menu', async () => {
        const response = await getMenu();
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });

    it('should place an order and return 201', async () => {
        const orderData = {
            items: [{ id: '1', name: 'Burger', price: 10, quantity: 1 }],
            customer: { name: 'Test User', address: '123 St', phone: '1234567890' },
            total: 10
        };

        const request = new Request('http://localhost:3000/api/orders', {
            method: 'POST',
            body: JSON.stringify(orderData),
        });

        const response = await placeOrder(request);
        const data = await response.json();

        expect(response.status).toBe(201);
        expect(data.id).toBeDefined();
        expect(data.status).toBe('Order Received');
    });

    it('should return 400 for invalid order data', async () => {
        const request = new Request('http://localhost:3000/api/orders', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const response = await placeOrder(request);
        expect(response.status).toBe(400);
    });
});
