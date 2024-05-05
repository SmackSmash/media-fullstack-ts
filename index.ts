import express, { type Express } from 'express';

const app: Express = express();

app.listen(3001, () => {
  console.log('Server running');
});
