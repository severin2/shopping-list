'use client';

import ItemForm from '@/components/itemForm';
import ItemList from '@/components/itemList';
import {
  addItem,
  clearSelectedItem,
  closeDrawer,
  deleteItem,
  editItem,
  fetchItems,
  openDrawer,
  selectItem,
} from '@/store/itemsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { Item } from '@/types/item';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.items.items);
  const isLoading = useSelector((state: RootState) => state.items.isLoading);
  const selectedItem = useSelector((state: RootState) => state.items.selectedItem);
  const drawerOpen = useSelector((state: RootState) => state.items.drawerOpen);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleAddStart = () => {
    dispatch(selectItem(null));
    dispatch(openDrawer());
  };

  const handleAddSave = (item: Omit<Item, 'id' | 'isPurchased'>) => {
    dispatch(addItem(item));
    dispatch(closeDrawer());
  };

  const handleDelete = (id: number) => {
    dispatch(deleteItem(id));
  };

  const handleCancel = () => {
    dispatch(clearSelectedItem());
    dispatch(closeDrawer());
  };

  const handleEditStart = (item: Item) => {
    dispatch(selectItem(item));
    dispatch(openDrawer());
  };

  const handleEditSave = (item: Item) => {
    dispatch(editItem(item));
    dispatch(closeDrawer());
  };

  return (
    <main className='mx-8 mt-8'>
      {isLoading && (
        <div className='flex items-center justify-center h-[300px]'>
          <div className='flex flex-col items-center'>
            <span className='mb-2'>
              <CircularProgress size={100} color='primary' />
            </span>
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className='flex items-end justify-between'>
            <Typography variant='body1'>Your Items</Typography>
            {items.length > 0 && (
              <Button type='button' variant='contained' onClick={handleAddStart}>
                Add Item
              </Button>
            )}
          </div>
          <Drawer
            anchor='right'
            open={drawerOpen}
            onClose={handleCancel}
            slotProps={{
              paper: {
                sx: {
                  width: '100%',
                  maxWidth: '700px',
                },
              },
            }}
          >
            <ItemForm
              onAdd={handleAddSave}
              onEdit={handleEditSave}
              onCancel={handleCancel}
              item={selectedItem}
              isLoading={isLoading}
            />
          </Drawer>
          {items.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-[300px] border border-gray-300 rounded-lg text-gray-400'>
              <Typography variant='body1' gutterBottom>
                Your shopping list is empty 😥
              </Typography>
              <Button variant='contained' color='primary' onClick={handleAddStart}>
                Add your first item
              </Button>
            </div>
          ) : (
            <ItemList
              items={items}
              onDelete={handleDelete}
              onEdit={handleEditStart}
              onPurchase={handleEditSave}
            />
          )}
        </>
      )}
    </main>
  );
}
