export type UUIDType = string;

export interface IUser {
  id?: UUIDType;
  username: string;
  age: number;
  hobbies: string[];
}
