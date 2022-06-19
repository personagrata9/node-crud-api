/* eslint-disable @typescript-eslint/no-misused-promises */
import 'dotenv/config';
import { EOL } from 'os';
import { parse, ParsedPath } from 'path';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { INVALID_METHOD_MESSAGE } from './consts/errorsMessages';
import Method from './consts/method';
import CustomError from './errors.ts/CustomError';
import UsersRouter from './resources/users/UsersRouter';

const { PORT } = process.env;

const server: Server = createServer();

const usersRouter = new UsersRouter();

const { pid } = process;

server.on('request', async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  const parsedPath: ParsedPath = req.url ? parse(req.url) : parse('');
  const { dir } = parsedPath;
  const { base } = parsedPath;

  res.setHeader('Content-Type', 'application/json');

  try {
    switch (method) {
      case Method.GET:
        await usersRouter.get(dir, base, res);
        break;
      case Method.POST:
        await usersRouter.post(dir, base, req, res);
        break;
      case Method.PUT:
        await usersRouter.put(dir, base, req, res);
        break;
      case Method.DELETE:
        await usersRouter.delete(dir, base, res);
        break;
      default:
        res.statusCode = 404;
        throw new CustomError(INVALID_METHOD_MESSAGE);
    }
  } catch (error) {
    if (error instanceof CustomError) {
      res.end(JSON.stringify({ message: error.message }));
    } else {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'Something went wrong' }));
    }
  }

  if (method && url) {
    process.stdout.write(
      `pid ${pid}: [METHOD] ${method} [URL] ${url} [STATUS] ${res.statusCode} ${res.statusMessage}${EOL}`
    );
  }
});

server.on('listening', () => {
  if (PORT) process.stdout.write(`pid ${pid}: SERVER IS RUNNING ON PORT ${PORT}${EOL}`);
});

export default server;
