import { NextResponse } from 'next/server';
import { orders } from '@/data';
import { Order, OrderStatus } from '@/types';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, customer, total } = body;

        if (!items || !customer || !total) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newOrder: Order = {
            id: Math.random().toString(36).substr(2, 9),
            items,
            customer,
            total,
            status: 'Order Received',
            createdAt: new Date().toISOString(),
        };

        orders.push(newOrder);

        // Simulate status updates
        simulateStatusUpdates(newOrder.id);

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}

export async function GET() {
    return NextResponse.json(orders);
}

function simulateStatusUpdates(orderId: string) {
    const statusSequence: OrderStatus[] = ['Preparing', 'Out for Delivery', 'Delivered'];

    statusSequence.forEach((status, index) => {
        setTimeout(() => {
            const order = orders.find(o => o.id === orderId);
            if (order) {
                order.status = status;
                console.log(`Order ${orderId} status updated to: ${status}`);
            }
        }, (index + 1) * 30000); // Update every 30 seconds
    });
}

