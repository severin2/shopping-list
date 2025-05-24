import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Item } from '@/types/item';
import { ChangeEvent, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface ItemListProps {
  items: Item[];
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
  onPurchase: (item: Item) => void;
}

export default function ItemList({ items, onDelete, onEdit, onPurchase }: ItemListProps) {
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const handleCheckboxChange = (item: Item, change: ChangeEvent<HTMLInputElement>) => {
    onPurchase({ ...item, isPurchased: change.target.checked });
  };

  const handleDeleteClick = (id: number) => {
    setPendingDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId !== null) {
      onDelete(pendingDeleteId);
      setPendingDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setPendingDeleteId(null);
  };

  return (
    <>
      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            divider
            sx={{ borderRadius: 2, my: 1, boxShadow: 0, border: '1px solid #eee' }}
          >
            <Checkbox
              onChange={(event) => handleCheckboxChange(item, event)}
              checked={item.isPurchased}
              tabIndex={-1}
              disableRipple
              sx={{ mr: 2 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant='subtitle1'
                fontWeight={600}
                gutterBottom={false}
                sx={
                  item.isPurchased
                    ? { color: '#548acb', textDecoration: 'line-through' }
                    : { color: 'black' }
                }
              >
                {item.name}
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={item.isPurchased ? { textDecoration: 'line-through' } : {}}
              >
                {item.description}
              </Typography>
            </Box>
            <IconButton edge='end' aria-label='edit' sx={{ mr: 1 }} onClick={() => onEdit(item)}>
              <EditIcon />
            </IconButton>
            <IconButton edge='end' aria-label='delete' onClick={() => handleDeleteClick(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Dialog open={pendingDeleteId !== null} onClose={handleCancelDelete}>
        <DialogTitle>Delete Item?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this item? This can not be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color='inherit'>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color='primary' type='button' variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
