import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import { Item } from '../app/api/items/route';

interface ItemFormProps {
  onAdd?: (item: Omit<Item, 'id' | 'isPurchased'>) => Promise<void>;
  onEdit?: (item: Item) => Promise<void>;
  onCancel?: () => void;
  isLoading: boolean;
  item?: Item | null;
}

export default function ItemForm({ onAdd, onEdit, onCancel, isLoading, item }: ItemFormProps) {
  const [name, setName] = useState(item?.name || '');
  const [description, setDescription] = useState(item?.description || '');
  const [quantity, setQuantity] = useState(item?.quantity || 1);
  const [isPurchased, setIsPurchased] = useState(item?.isPurchased || false);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setQuantity(item.quantity);
      setIsPurchased(item.isPurchased);
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (item && onEdit) {
      await onEdit({ ...item, name, description, quantity, isPurchased });
    } else if (onAdd) {
      await onAdd({ name, description, quantity });
      setName('');
      setDescription('');
      setQuantity(1);
    }
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    setQuantity(1);
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 16, minWidth: 320 }}
    >
      <div>
        <TextField
          label={item ? 'Edit item name' : 'New Item'}
          placeholder={item ? 'Buy tomatoes' : 'Enter item name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
          size='medium'
          fullWidth
          inputProps={{ maxLength: 100 }}
        />
      </div>
      <div>
        <TextField
          label='Description'
          placeholder={item ? 'Get them from Walmart' : 'Enter description'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size='medium'
          fullWidth
          multiline
          minRows={3}
          inputProps={{ maxLength: 100 }}
          helperText={`${description.length}/100`}
        />
      </div>
      <div>
        <TextField
          label='Quantity'
          select
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          size='medium'
          fullWidth
        >
          {[...Array(20)].map((_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {i + 1}
            </MenuItem>
          ))}
        </TextField>
      </div>
      {item && (
        <FormControlLabel
          control={
            <Checkbox checked={isPurchased} onChange={(e) => setIsPurchased(e.target.checked)} />
          }
          label='Purchased'
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 32 }}>
        <Button type='button' onClick={() => handleCancel()} color='inherit'>
          Cancel
        </Button>
        <Button type='submit' variant='contained' disabled={isLoading || !name.trim()}>
          {item ? 'Save Item' : 'Add'}
        </Button>
      </div>
    </form>
  );
}
