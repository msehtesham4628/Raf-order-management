import { FoodItem, Order } from './types';

export const menu: FoodItem[] = [
    {
        id: '1',
        name: 'Truffle Mushroom Burger',
        description: 'Umami-rich mushroom burger with truffle aioli and swiss cheese.',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '2',
        name: 'Neapolitan Margherita Pizza',
        description: 'Classic pizza with fresh mozzarella, basil, and San Marzano tomatoes.',
        price: 18.50,
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '3',
        name: 'Spicy Salmon Sushi Roll',
        description: 'Fresh salmon with sriracha mayo, avocado, and cucumber.',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '4',
        name: 'Crispy Korean Fried Chicken',
        description: 'Double-fried chicken glazed in sweet and spicy gochujang sauce.',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '5',
        name: 'Garden Fresh Quinoa Bowl',
        description: 'Nutritious bowl with roasted vegetables, kale, and lemon-tahini dressing.',
        price: 13.50,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '6',
        name: 'Classic Chocolate Lava Cake',
        description: 'Decadent chocolate cake with a molten center, served with vanilla bean ice cream.',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1541919329513-35f7af297129?auto=format&fit=crop&w=800&q=80',
    }
];

// Use globalThis to persist data across HMR in development
const globalForData = globalThis as unknown as {
    orders: Order[];
};

export const orders = globalForData.orders ?? [];

if (process.env.NODE_ENV !== 'production') globalForData.orders = orders;
