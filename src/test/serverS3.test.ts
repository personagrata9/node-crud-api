import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import {
  INVALID_REQUEST_DATA_MESSAGE,
  INVALID_ROUTE_MESSAGE,
  INVALID_USER_ID_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from '../consts/errorsMessages';
import { IUser, UUIDType } from '../resources/users/IUser';
import server from '../server';

describe('Scenario 3', () => {
  test('Should return invalid route message', async () => {
    const res = await request(server).get('/some-non/existing/resource');

    expect(res.statusCode).toBe(404);
    expect(JSON.stringify(res.body) === JSON.stringify({ message: INVALID_ROUTE_MESSAGE })).toBeTruthy();
  });

  test('Should return invalid request data message', async () => {
    const newUser: Partial<IUser> = {
      username: 'John Doe',
      age: 25,
    };

    const res = await request(server).post('/api/users').send(JSON.stringify(newUser));

    expect(res.statusCode).toBe(400);
    expect(JSON.stringify(res.body) === JSON.stringify({ message: INVALID_REQUEST_DATA_MESSAGE })).toBeTruthy();
  });

  test('Should find no user to update', async () => {
    const userToUpdate: IUser = {
      username: 'Jane Doe',
      age: 20,
      hobbies: ['yoga', 'Netflix'],
    };

    const randomUuid: UUIDType = uuidv4();

    const res = await request(server).put(`/api/users/${randomUuid}`).send(JSON.stringify(userToUpdate));

    expect(res.statusCode).toBe(404);
    expect(JSON.stringify(res.body) === JSON.stringify({ message: USER_NOT_FOUND_MESSAGE })).toBeTruthy();
  });

  test('Should return invalid uuid message', async () => {
    const res = await request(server).get(`/api/users/not-uuid`);

    expect(res.statusCode).toBe(400);
    expect(JSON.stringify(res.body) === JSON.stringify({ message: INVALID_USER_ID_MESSAGE })).toBeTruthy();
  });

  test('Should return no users', async () => {
    const res = await request(server).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
