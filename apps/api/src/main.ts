import express from 'express';
import clientRouter from './routes/client';
import invoiceRouter from './routes/invoice';
import agentRouter from './routes/agent';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();

// Middleware
app.use(express.json());

// CORS configuration for Angular app
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/health', (req, res) => {
  res.send({ message: 'API is running' });
});

app.use("/api/agent", agentRouter);
app.use("/api/client", clientRouter);
app.use("/api/invoice", invoiceRouter);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
