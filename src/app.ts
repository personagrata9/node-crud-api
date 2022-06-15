import 'dotenv/config';
import { createServer } from 'http';

const server = createServer((_, res) => {
  res.end('Request accepted');
});

const DEFAULT_PORT = '4000';
const port = process.env.PORT || DEFAULT_PORT;

server.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
