import express from 'express';
import path from 'path';
import { calculate } from './src';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/calculate', (req, res, next) => {
  const N = parseInt(req.query.n, 10);
  console.log(N);
  const result = calculate(N);
  res.send({ result });
});

app.listen(3032, () => {
  console.log('listening 3032');
});