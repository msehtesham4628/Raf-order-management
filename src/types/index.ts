export type OrderStatus = 'Order Received' | 'Preparing' | 'Out for Delivery' | 'Delivered';

export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export interface CartItem extends FoodItem {
    quantity: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    customer: {
        name: string;
        address: string;
        phone: string;
    };
    status: OrderStatus;
    createdAt: string;
}

