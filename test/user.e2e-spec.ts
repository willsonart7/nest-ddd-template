import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/user/:id (PUT)', () => {
    const id = 'b5b2e363-f961-4602-b5b8-60943ab602d3';
    const email = 'test@test.com';
    const username = 'test';
    const password = '12345678';

    return request(app.getHttpServer())
      .put(`/user/${id}`)
      .send({ email, username, password })
      .expect(201);
  });

  it('/user/test (GET)', async () => {
    const id = 'b5b2e363-f961-4602-b5b8-60943ab602d8';
    const email = 'test@test2.com';
    const username = 'test_2';
    const password = '12345678';

    const agent = request(app.getHttpServer());

    await agent
      .put(`/user/${id}`)
      .send({ email, username, password })
      .expect(201);

    const login = await agent
      .post('/auth')
      .send({ username, password })
      .expect(201);

    const { access_token } = login.body;

    await agent
      .get('/user/test')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200)
      .expect(`Hello, ${username}`);
  });

  it('/user/:id (GET)', async () => {
    const id = 'b5b2e363-f961-4602-b5b8-60943ab602d3';

    const agent = request(app.getHttpServer());

    const user = await agent.get(`/user/${id}`).expect(200);

    expect(user.body).toHaveProperty('id');
    expect(user.body).toHaveProperty('username');
    expect(user.body).toHaveProperty('email');
  });

  it('/user/:id (GET) should return UserNotFound error', async () => {
    // unexisting uuid
    const id = 'b5b2e363-f961-4602-b5b8-60943ab602d9';

    const agent = request(app.getHttpServer());
    const user = await agent.get(`/user/${id}`).expect(200);

    expect(user.body).toHaveProperty('message');
    expect(user.body.message).toBe('User Not Found');
  });
});
