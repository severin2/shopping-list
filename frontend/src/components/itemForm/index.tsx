import { Item } from '@/types/item';
import LastPageOutlinedIcon from '@mui/icons-material/LastPageOutlined';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { DosisHeader } from '@/components/header/style';

interface ItemFormProps {
  onAdd?: (item: Omit<Item, 'id' | 'isPurchased'>) => void;
  onEdit?: (item: Item) => void;
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
    <>
      <DosisHeader className='px-8 py-3 bg-gray-100'>
        <div className='flex flex-row items-center justify-between'>
          <Typography variant='h6'>SHOPPING LIST</Typography>
          <Button aria-label='Close' color='inherit' onClick={handleCancel}>
            <LastPageOutlinedIcon />
          </Button>
        </div>
      </DosisHeader>
      <div className='flex flex-col h-full mx-8 my-4'>
        <div className='my-6'>
          <Typography variant='body1'>{item ? 'Edit an Item' : 'Add an Item'}</Typography>
          <Typography variant='body2' gutterBottom>
            {item ? 'Edit your item below' : 'Add your new item below'}
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col justify-between h-full'>
          <div className='flex flex-col gap-6'>
            <TextField
              label={item ? 'Edit item name' : 'New Item'}
              placeholder={item ? 'Buy tomatoes' : 'Enter item name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              size='medium'
              fullWidth
              slotProps={{ htmlInput: { maxLength: 100 } }}
            />
            <TextField
              label='Description'
              placeholder={item ? 'Get them from Walmart' : 'Enter description'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size='medium'
              fullWidth
              multiline
              minRows={3}
              slotProps={{ htmlInput: { maxLength: 100 } }}
              helperText={`${description.length}/100`}
            />
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
            {item && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPurchased}
                    onChange={(e) => setIsPurchased(e.target.checked)}
                  />
                }
                label='Purchased'
              />
            )}
          </div>
          <div className='flex justify-end gap-4 mt-8'>
            <Button type='button' onClick={handleCancel} color='inherit'>
              Cancel
            </Button>
            <Button type='submit' variant='contained' disabled={isLoading || !name.trim()}>
              {item ? 'Save Item' : 'Add Item'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
