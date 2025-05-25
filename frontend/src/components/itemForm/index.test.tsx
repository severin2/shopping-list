import { render, screen, fireEvent, act } from '@testing-library/react';
import ItemForm from '@/components/itemForm';

describe('ItemForm', () => {
  it('renders the form and allows input', async () => {
    const handleAdd = jest.fn();
    render(<ItemForm onAdd={handleAdd} isLoading={false} />);
    expect(screen.getByLabelText(/new item/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/new item/i), { target: { value: 'Milk' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /add item/i }));
    });

    expect(handleAdd).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Milk', description: '', quantity: 1 })
    );
  });
});
