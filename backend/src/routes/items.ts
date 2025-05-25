import { PrismaClient } from '@prisma/client';
import express from 'express';
import { getItems, getItem, createItem, updateItem, deleteItem } from '../services/items';

const prisma = new PrismaClient();
const itemsApp = express.Router();

itemsApp.get(
  '/',
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    try {
      const items = await getItems();
      return res.json(items);
    } catch (e) {
      res.status(500).json({ error: 'Database error' });
    }
  }
);

itemsApp.get(
  '/:id',
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    const id = parseInt(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    try {
      const item = await getItem(id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      return res.json(item);
    } catch (e) {
      res.status(500).json({ error: 'Database error' });
    }
  }
);

itemsApp.post(
  '/',
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    const { name, description, quantity } = req.body;
    if (typeof name !== 'string' || typeof description !== 'string' || !Number.isFinite(quantity)) {
      return res.status(400).json({ error: 'name, description, and quantity required' });
    }
    try {
      const newItem = await createItem({ name, description, quantity });
      return res.status(201).json(newItem);
    } catch (e) {
      res.status(500).json({ error: 'Database error' });
    }
  }
);

itemsApp.put(
  '/:id',
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    const id = parseInt(req.params.id);
    const { name, description, quantity, isPurchased } = req.body;
    if (
      typeof name !== 'string' ||
      typeof description !== 'string' ||
      !Number.isFinite(quantity) ||
      (isPurchased !== true && isPurchased !== false)
    ) {
      return res
        .status(400)
        .json({ error: 'name, description, quantity, and isPurchased required' });
    }
    try {
      const updated = await updateItem(id, { name, description, quantity, isPurchased });
      return res.json(updated);
    } catch (e) {
      res.status(404).json({ error: 'Not found' });
    }
  }
);

itemsApp.delete(
  '/:id',
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    const id = parseInt(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    try {
      await deleteItem(id);
      return res.status(204).end();
    } catch (e) {
      res.status(404).json({ error: 'Not found' });
    }
  }
);

export default itemsApp;
