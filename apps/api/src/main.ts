import express from 'express';
import { clientRouter, invoiceRouter, agentRouter } from './routes';
import helmet from 'helmet';
import morgan from 'morgan';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// CORS configuration for Angular app
// app.use(cors());
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
