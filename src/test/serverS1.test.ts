import request from 'supertest';
import { USER_NOT_FOUND_MESSAGE } from '../consts/errorsMessages';
import { IUser, UUIDType } from '../resources/users/IUser';
import { server } from '../server';
import uuidValidateV4 from '../utils/uuidValidateV4';

describe('Scenario 1', () => {
  let userId: UUIDType;
  let createdRecord: IUser;

  test('Should return no users', async () => {
    const res = await request(server).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('Should create user', async () => {
    const newUser: IUser = {
      username: 'John Doe',
      age: 25,
      hobbies: [],
    };

    const res = await request(server).post('/api/users').send(JSON.stringify(newUser));

    createdRecord = res.body as IUser;
    userId = createdRecord.id || '';
    const { username, age, hobbies } = newUser;
    const newUserWithId = {
      id: userId,
      username,
      age,
      hobbies,
    };

    expect(res.statusCode).toBe(201);
    expect(uuidValidateV4(userId)).toBeTruthy();
    expect(JSON.stringify(createdRecord) === JSON.stringify(newUserWithId)).toBeTruthy();
  });

  test('Should get user by id', async () => {
    const res = await request(server).get(`/api/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(JSON.stringify(res.body) === JSON.stringify(createdRecord)).toBeTruthy();
  });

  test('Should return updated user', async () => {
    const userToUpdate: IUser = {
      username: 'Jane Doe',
      age: 20,
      hobbies: ['yoga', 'Netflix'],
    };

    const { username, age, hobbies } = userToUpdate;
    const userToUpdateWithId = {
      id: userId,
      username,
      age,
      hobbies,
    };

    const res = await request(server).put(`/api/users/${userId}`).send(JSON.stringify(userToUpdate));

    expect(res.statusCode).toBe(200);
    expect(JSON.stringify(res.body) === JSON.stringify(userToUpdateWithId)).toBeTruthy();
  });

  test('Should delete user', async () => {
    const res = await request(server).delete(`/api/users/${userId}`);

    expect(res.statusCode).toBe(204);
    expect(res.body).toBeFalsy();
  });

  test('Should find no user', async () => {
    const res = await request(server).get(`/api/users/${userId}`);

    expect(res.statusCode).toBe(404);
    expect(JSON.stringify(res.body) === JSON.stringify({ message: USER_NOT_FOUND_MESSAGE })).toBeTruthy();
  });
});
