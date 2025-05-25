import express from 'express';
import request from 'supertest';
import itemsApp from '../routes/items';

jest.mock('@prisma/client', () => {
  const mPrisma = {
    item: {
      findMany: jest
        .fn()
        .mockResolvedValue([
          { id: 1, name: 'Milk', description: 'Dairy', quantity: 2, isPurchased: false },
        ]),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

describe('GET /items', () => {
  let app: express.Express;
  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/items', itemsApp);
  });

  it('should return a list of items', async () => {
    const res = await request(app).get('/items');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, name: 'Milk', description: 'Dairy', quantity: 2, isPurchased: false },
    ]);
  });
});
