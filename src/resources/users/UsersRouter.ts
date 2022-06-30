import { IncomingMessage, ServerResponse } from 'http';
import { INVALID_ROUTE_MESSAGE } from '../../consts/errorsMessages';
import CustomError from '../../errors.ts/CustomError';
import createUsersController from './UsersController';

const usersController = createUsersController();

export default class UsersRouter {
  private sendInvalidRouteResponse = (res: ServerResponse) => {
    res.statusCode = 404;
    throw new CustomError(INVALID_ROUTE_MESSAGE);
  };

  public get = async (dir: string, base: string, res: ServerResponse): Promise<void> => {
    if (dir === '/api' && base === 'users') {
      await usersController.getUsers(res);
    } else if (dir === '/api/users') {
      await usersController.getUser(base, res);
    } else {
      this.sendInvalidRouteResponse(res);
    }
  };

  public post = async (dir: string, base: string, req: IncomingMessage, res: ServerResponse): Promise<void> => {
    if (dir === '/api' && base === 'users') {
      await usersController.createUser(req, res);
    } else {
      this.sendInvalidRouteResponse(res);
    }
  };

  public put = async (dir: string, base: string, req: IncomingMessage, res: ServerResponse): Promise<void> => {
    if (dir === '/api/users') {
      await usersController.updateUser(base, req, res);
    } else {
      this.sendInvalidRouteResponse(res);
    }
  };

  public delete = async (dir: string, base: string, res: ServerResponse): Promise<void> => {
    if (dir === '/api/users') {
      await usersController.deleteUser(base, res);
    } else {
      this.sendInvalidRouteResponse(res);
    }
  };
}
