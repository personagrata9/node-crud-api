import { IncomingMessage, ServerResponse } from 'http';
import {
  INVALID_REQUEST_DATA_MESSAGE,
  INVALID_USER_ID_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from '../consts/errorsMessages';
import CustomError from '../errors.ts/CustomError';
import InMemorydatabase from '../imdb/imdb';
import { IUser, UUIDType } from '../models/IUser';
import getRequestData from '../utils/getRequestData';
import uuidValidateV4 from '../utils/uuidValidateV4';
import validateUser from '../utils/validateUser';

export default class UserController {
  private database: InMemorydatabase;

  constructor() {
    this.database = new InMemorydatabase();
  }

  public getUsers = async (res: ServerResponse): Promise<void> => {
    const users = await this.database.findAllUsers();

    res.statusCode = 200;
    res.end(JSON.stringify(users));
  };

  public getUser = async (base: string, res: ServerResponse): Promise<void> => {
    const isUUID: boolean = uuidValidateV4(base);

    if (!isUUID) {
      res.statusCode = 400;
      throw new CustomError(INVALID_USER_ID_MESSAGE);
    } else {
      const userId: UUIDType = base;

      const searchedUser = await this.database.findUserById(userId);

      if (!searchedUser) {
        res.statusCode = 404;
        throw new CustomError(USER_NOT_FOUND_MESSAGE);
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(searchedUser));
      }
    }
  };

  public addUser = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const data: string = await getRequestData(req);
    const dataParsed: unknown = JSON.parse(data);

    const isUser = validateUser(dataParsed as Record<string, unknown>);

    if (!isUser) {
      res.statusCode = 400;
      throw new CustomError(INVALID_REQUEST_DATA_MESSAGE);
    } else {
      const id = await this.database.createUserId();
      const { username, age, hobbies } = dataParsed as IUser;

      const newUser = {
        id,
        username,
        age,
        hobbies,
      };

      await this.database.addUser(newUser);

      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    }
  };
}
