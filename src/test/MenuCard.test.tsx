import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuCard from '@/components/MenuCard';

describe('MenuCard Component', () => {
    const mockItem = {
        id: '1',
        name: 'Test Pizza',
        description: 'Delicious pizza',
        price: 15.99,
        image: 'test.jpg'
    };

    it('renders correctly', () => {
        render(<MenuCard item={mockItem} onAdd={() => { }} />);
        expect(screen.getByText('Test Pizza')).toBeDefined();
        expect(screen.getByText('$15.99')).toBeDefined();
    });

    it('calls onAdd when button is clicked', () => {
        const onAdd = vi.fn();
        render(<MenuCard item={mockItem} onAdd={onAdd} />);
        fireEvent.click(screen.getByText('Add to Cart'));
        expect(onAdd).toHaveBeenCalledWith(mockItem);
    });
});

