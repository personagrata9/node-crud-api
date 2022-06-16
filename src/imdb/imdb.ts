import { v4 as uuidv4 } from 'uuid';
import { IUser, UUIDType } from '../models/IUser';

export default class InMemorydatabase {
  private users: IUser[];

  private newUserId!: UUIDType;

  constructor() {
    this.users = [];
  }

  public findAllUsers = (): Promise<IUser[]> =>
    new Promise((resolve) => {
      resolve(this.users);
    });

  public findUserById = (userId: UUIDType): Promise<IUser | undefined> =>
    new Promise((resolve) => {
      const searchedUser: IUser | undefined = this.users.find((user) => user.id === userId);
      resolve(searchedUser);
    });

  public createUserId = async (): Promise<UUIDType> => {
    this.newUserId = uuidv4();

    const isUserExist = await this.findUserById(this.newUserId);
    if (isUserExist) await this.createUserId();

    return this.newUserId;
  };

  public addUser = (user: IUser): Promise<void> =>
    new Promise((resolve) => {
      this.users.push(user);
      resolve();
    });
}
