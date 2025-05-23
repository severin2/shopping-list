import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Item } from '../app/api/items/route';
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ItemListProps {
  items: Item[];
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
}

export default function ItemList({ items, onDelete, onEdit }: ItemListProps) {
  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.id}
          divider
          sx={{ borderRadius: 2, my: 1, boxShadow: 0, border: '1px solid #eee' }}
        >
          <Checkbox checked={item.isPurchased} tabIndex={-1} disableRipple sx={{ mr: 2 }} />
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
          <IconButton edge='end' aria-label='delete' onClick={() => onDelete(item.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}
