import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import itemsApp from './routes/items';

const app = express();
const port = process.env.PORT || 4000;

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

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorize: true,
  })
);

app.use(cors());
app.use(express.json());
app.use('/items', itemsApp);

const prisma = new PrismaClient();

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
