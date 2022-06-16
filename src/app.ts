/* eslint-disable @typescript-eslint/no-misused-promises */
import 'dotenv/config';
import { EOL } from 'os';
import { parse, ParsedPath } from 'path';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import DEFAULT_PORT from './consts/defaultPort';
import Method from './consts/method';
import UserController from './controllers/userController';
import CustomError from './errors.ts/CustomError';
import { INVALID_METHOD_MESSAGE, INVALID_ROUTE_MESSAGE } from './consts/errorsMessages';

const server: Server = createServer();

const userController = new UserController();

server.on('request', async (req: IncomingMessage, res: ServerResponse) => {
  const url: ParsedPath = req.url ? parse(req.url) : parse('');
  const { dir } = url;
  const { base } = url;
  const { method } = req;

  res.setHeader('Content-Type', 'application/json');

  try {
    switch (method) {
      case Method.GET:
        if (dir === '/api' && base === 'users') {
          await userController.getUsers(res);
        } else if (dir === '/api/users') {
          await userController.getUser(base, res);
        } else {
          throw new CustomError(INVALID_ROUTE_MESSAGE);
        }
        break;
      case Method.POST:
        if (dir === '/api' && base === 'users') {
          await userController.addUser(req, res);
        } else {
          throw new CustomError(INVALID_ROUTE_MESSAGE);
        }
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
});

const port: string = process.env.PORT || DEFAULT_PORT;

server.listen(port, () => {
  process.stdout.write(`SERVER IS RUNNING ON PORT ${port}${EOL}`);
});
