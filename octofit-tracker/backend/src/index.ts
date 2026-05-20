import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { getApiBaseUrl } from './config/apiUrl';
import { connectDatabase } from './config/database';
import { apiRouter } from './routes';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 8000);
const apiBaseUrl = getApiBaseUrl();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`Backend running on ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend service', error);
    process.exit(1);
  }
}

void startServer();
