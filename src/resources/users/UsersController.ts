import { IncomingMessage, ServerResponse } from 'http';
import {
  INVALID_REQUEST_DATA_MESSAGE,
  INVALID_USER_ID_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from '../../consts/errorsMessages';
import CustomError from '../../errors.ts/CustomError';
import { IUser, UUIDType } from './IUser';
import getRequestData from '../../utils/getRequestData';
import uuidValidateV4 from '../../utils/uuidValidateV4';
import validateNewUser from '../../utils/validateNewUser';
import createDatabase from '../../imdb/imdb';

const db = createDatabase();

const createUsersController = () => {
  class UsersController {
    public getUsers = async (res: ServerResponse): Promise<void> => {
      const users = await db.findAllUsers();

      res.statusCode = 200;
      res.end(JSON.stringify(users));
    };

    public getUser = async (base: string, res: ServerResponse, content = true): Promise<void> => {
      const isUUID: boolean = uuidValidateV4(base);

      if (!isUUID) {
        res.statusCode = 400;
        throw new CustomError(INVALID_USER_ID_MESSAGE);
      } else {
        const userId: UUIDType = base;

        const searchedUser = await db.findUserById(userId);

        if (!searchedUser) {
          res.statusCode = 404;
          throw new CustomError(USER_NOT_FOUND_MESSAGE);
        } else if (content) {
          res.statusCode = 200;
          res.end(JSON.stringify(searchedUser));
        }
      }
    };

    public createUser = async (
      req: IncomingMessage,
      res: ServerResponse,
      update = false,
      userId?: UUIDType
    ): Promise<void> => {
      const data: string = await getRequestData(req);

      const isUser: boolean = validateNewUser(data);

      if (!isUser) {
        res.statusCode = 400;
        throw new CustomError(INVALID_REQUEST_DATA_MESSAGE);
      } else {
        const dataParsed = JSON.parse(data) as IUser;
        const id: string | undefined = update ? userId : await db.createUserId();
        const { username, age, hobbies } = dataParsed;

        const newUser: IUser = {
          id,
          username,
          age,
          hobbies,
        };

        if (update && userId) {
          await db.updateUser(userId, newUser);
        } else {
          await db.addUser(newUser);
        }

        res.statusCode = update ? 200 : 201;
        res.end(JSON.stringify(newUser));
      }
    };

    public updateUser = async (base: string, req: IncomingMessage, res: ServerResponse) => {
      await this.getUser(base, res, false);

      const userId: UUIDType = base;
      await this.createUser(req, res, true, userId);
    };

    public deleteUser = async (base: string, res: ServerResponse): Promise<void> => {
      await this.getUser(base, res, false);
      const userId: UUIDType = base;
      await db.deleteUser(userId);
      res.statusCode = 204;
      res.end();
    };
  }

  const userController = new UsersController();

  return userController;
};

export default createUsersController;
