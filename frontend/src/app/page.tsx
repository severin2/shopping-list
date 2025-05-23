'use client';

import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import { Item, ResponseData } from './api/items/route';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((result: ResponseData<Item[]>) => setItems(result.data || []));
  }, []);

  const handleAddStart = () => {
    setSelectedItem(null);
    setDrawerOpen(true);
  };

  const handleAddSave = async (item: Omit<Item, 'id' | 'isPurchased'>) => {
    setIsLoading(true);
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (res.ok) {
      const createdResult: ResponseData<Item> = await res.json();
      if (createdResult.data) {
        setItems((prev) => {
          let nextItems = [...prev];
          nextItems = [...prev, createdResult.data!];
          return nextItems;
        });
      }

      setDrawerOpen(false);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/items?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setItems((prev) => prev.filter((item: Item) => item.id !== id));
    }
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setDrawerOpen(false);
  };

  const handleEditStart = (item: Item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleEditSave = async (item: Item) => {
    setIsLoading(true);

    const res = await fetch(`/api/items?id=${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      const updatedResult: ResponseData<Item> = await res.json();
      if (updatedResult.data) {
        setItems((prev) => {
          const index = prev.findIndex((i) => i.id === item.id);
          if (index !== -1) {
            const updatedItems = [...prev];
            updatedItems[index] = { ...updatedResult.data! };
            return updatedItems;
          }
          return prev;
        });
      }
      setDrawerOpen(false);
    }
    setIsLoading(false);
  };

  return (
    <main style={{ maxWidth: 400, margin: '2rem auto' }}>
      <div className='flex items-center justify-between mb-4'>
        <Typography variant='h4' gutterBottom>
          Shopping List
        </Typography>
        {items.length > 0 && (
          <Button type='button' variant='contained' onClick={handleAddStart}>
            Add Item
          </Button>
        )}
      </div>
      <Drawer anchor='right' open={drawerOpen} onClose={handleCancel}>
        <div style={{ width: 350, padding: 24 }}>
          <ItemForm
            onAdd={handleAddSave}
            onEdit={handleEditSave}
            onCancel={handleCancel}
            item={selectedItem}
            isLoading={isLoading}
          />
        </div>
      </Drawer>
      {items.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-[300px] border border-gray-300 rounded-lg text-gray-400'>
          <Typography variant='h6' gutterBottom>
            Your shopping list is empty 😥
          </Typography>
          <Button variant='contained' color='primary' onClick={handleAddStart}>
            Add your first item
          </Button>
        </div>
      ) : (
        <ItemList items={items} onDelete={handleDelete} onEdit={handleEditStart} />
      )}
    </main>
  );
}
