import request from 'supertest';
import { IUser, UUIDType } from '../resources/users/IUser';
import server from '../server';
import uuidValidateV4 from '../utils/uuidValidateV4';

describe('Scenario 2', () => {
  let firstUserId: UUIDType;
  let firstCreatedRecord: IUser;
  let secondUserId: UUIDType;
  let secondCreatedRecord: IUser;
  const records: IUser[] = [];

  test('Should create first user', async () => {
    const newUser: IUser = {
      username: 'John Doe',
      age: 25,
      hobbies: ['no hobby'],
    };

    const res = await request(server).post('/api/users').send(JSON.stringify(newUser));

    firstCreatedRecord = res.body as IUser;
    firstUserId = firstCreatedRecord.id || '';
    const { username, age, hobbies } = newUser;
    const newUserWithId = {
      id: firstUserId,
      username,
      age,
      hobbies,
    };

    records.push(firstCreatedRecord);

    expect(res.statusCode).toBe(201);
    expect(uuidValidateV4(firstUserId)).toBeTruthy();
    expect(JSON.stringify(firstCreatedRecord) === JSON.stringify(newUserWithId)).toBeTruthy();
  });

  test('Should create second user', async () => {
    const newUser: IUser = {
      username: 'Jane Doe',
      age: 20,
      hobbies: ['yoga', 'Netflix'],
    };

    const res = await request(server).post('/api/users').send(JSON.stringify(newUser));

    secondCreatedRecord = res.body as IUser;
    secondUserId = secondCreatedRecord.id || '';
    const { username, age, hobbies } = newUser;
    const newUserWithId = {
      id: secondUserId,
      username,
      age,
      hobbies,
    };

    records.push(secondCreatedRecord);

    expect(res.statusCode).toBe(201);
    expect(uuidValidateV4(secondUserId)).toBeTruthy();
    expect(JSON.stringify(secondCreatedRecord) === JSON.stringify(newUserWithId)).toBeTruthy();
  });

  test('Should return 2 users', async () => {
    const res = await request(server).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect((res.body as IUser[]).length).toBe(2);
  });

  test('Should delete first user', async () => {
    const res = await request(server).delete(`/api/users/${firstUserId}`);

    records.splice(0, 1);

    expect(res.statusCode).toBe(204);
    expect(res.body).toBeFalsy();
  });

  test('Should return 1 user', async () => {
    const res = await request(server).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect((res.body as IUser[]).length).toBe(1);
    expect(JSON.stringify((res.body as IUser[])[0]) === JSON.stringify(records[0]));
  });
});
