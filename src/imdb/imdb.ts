import { v4 as uuidv4 } from 'uuid';
import { IUser, UUIDType } from '../resources/users/IUser';

const createDatabase = () => {
  class InMemorydatabase {
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

    public addUser = (newUser: IUser): Promise<void> =>
      new Promise((resolve) => {
        this.users.push(newUser);
        resolve();
      });

    public updateUser = (userId: UUIDType, newUser: IUser): Promise<void> =>
      new Promise((resolve) => {
        const userIndex: number = this.users.findIndex((user) => user.id === userId);
        if (userIndex !== -1) {
          this.users.splice(userIndex, 1, newUser);
          resolve();
        }
      });

    public deleteUser = (userId: UUIDType): Promise<void> =>
      new Promise((resolve) => {
        const userIndex: number = this.users.findIndex((user) => user.id === userId);
        if (userIndex !== -1) {
          this.users.splice(userIndex, 1);
          resolve();
        }
      });
  }

  const db = new InMemorydatabase();

  return db;
};

export default createDatabase;
