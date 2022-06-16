import { IncomingMessage, ServerResponse } from 'http';
import { INVALID_ROUTE_MESSAGE } from '../../consts/errorsMessages';
import CustomError from '../../errors.ts/CustomError';
import UsersController from './UsersController';

export default class UsersRouter {
  private usersController!: UsersController;

  constructor() {
    this.usersController = new UsersController();
  }

  public get = async (dir: string, base: string, res: ServerResponse): Promise<void> => {
    if (dir === '/api' && base === 'users') {
      await this.usersController.getUsers(res);
    } else if (dir === '/api/users') {
      await this.usersController.getUser(base, res);
    } else {
      throw new CustomError(INVALID_ROUTE_MESSAGE);
    }
  };

  public post = async (dir: string, base: string, req: IncomingMessage, res: ServerResponse): Promise<void> => {
    if (dir === '/api' && base === 'users') {
      await this.usersController.createUser(req, res);
    } else {
      throw new CustomError(INVALID_ROUTE_MESSAGE);
    }
  };

  public put = async (dir: string, base: string, req: IncomingMessage, res: ServerResponse): Promise<void> => {
    if (dir === '/api/users') {
      await this.usersController.updateUser(base, req, res);
    } else {
      throw new CustomError(INVALID_ROUTE_MESSAGE);
    }
  };

  public delete = async (dir: string, base: string, res: ServerResponse): Promise<void> => {
    if (dir === '/api/users') {
      await this.usersController.deleteUser(base, res);
    } else {
      throw new CustomError(INVALID_ROUTE_MESSAGE);
    }
  };
}
