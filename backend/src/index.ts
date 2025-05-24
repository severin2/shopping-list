import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import winston from 'winston';
import expressWinston from 'express-winston';

const app = express();
const port = process.env.PORT || 4000;

// Winston logger setup
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

// Request logging middleware
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorize: true,
  })
);

app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

app.get(
  '/items',
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    try {
      const items = await prisma.item.findMany();
      return res.json(items);
    } catch (e) {
      res.status(500).json({ error: 'Database error' });
    }
  }
);

app.post(
  '/items',
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    const { name, description, quantity } = req.body;
    if (!name || !description || !Number.isFinite(quantity))
      return res.status(400).json({ error: 'name, description, and quantity required' });
    try {
      const newItem = await prisma.item.create({ data: { name, description, quantity } });
      return res.status(201).json(newItem);
    } catch (e) {
      res.status(500).json({ error: 'Database error' });
    }
  }
);

app.put(
  '/items/:id',
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    const id = parseInt(req.params.id);
    const { name, description, quantity, isPurchased } = req.body;
    if (
      !name ||
      !description ||
      !Number.isFinite(quantity) ||
      (isPurchased !== true && isPurchased !== false)
    )
      return res
        .status(400)
        .json({ error: 'name, description, quantity, and isPurchased required' });
    try {
      const updated = await prisma.item.update({
        where: { id },
        data: { name, description, quantity, isPurchased },
      });
      return res.json(updated);
    } catch (e) {
      res.status(404).json({ error: 'Not found' });
    }
  }
);

app.delete(
  '/items/:id',
  async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    const id = parseInt(req.params.id);
    try {
      await prisma.item.delete({ where: { id } });
      return res.status(204).end();
    } catch (e) {
      res.status(404).json({ error: 'Not found' });
    }
  }
);

app.get('/', (req, res) => {
  res.send('See you space cowboy...');
});

app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);

async function startServer() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    logger.info('Successfully connected to the Postgres database');
  } catch (err) {
    logger.error('Failed to connect to the Postgres database', { error: err });
    process.exit(1);
  }

  app.listen(port, () => {
    logger.info(`Backend listening on port ${port}`);
  });
}

startServer();
