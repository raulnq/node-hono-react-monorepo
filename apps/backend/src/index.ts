import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';

const app = new Hono();

app.use(
  '/api/*',
  cors({
    origin: 'http://localhost:5173',
  })
);

app.get('/api/hello', c => {
  return c.json({ message: 'Hello World from Hono!' });
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
