import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
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

  it('/auth (POST)', async () => {
    const id = 'b5b2e363-f961-4602-b5b8-60943ab602d3';
    const email = 'test@test.com';
    const username = 'test';
    const password = '12345678';

    const agent = request(app.getHttpServer());

    await agent
      .put(`/user/${id}`)
      .send({ email, username, password })
      .expect(200);

    const login = await agent
      .post('/auth')
      .send({ username, password })
      .expect(201);

    expect(login.body).toHaveProperty('access_token');
  });

  it('/auth (GET)', async () => {
    const id = 'b5b2e363-f961-4602-b5b8-60943ab602d3';
    const email = 'test@test.com';
    const username = 'test';
    const password = '12345678';

    const agent = request(app.getHttpServer());

    await agent
      .put(`/user/${id}`)
      .send({ email, username, password })
      .expect(200);

    const login = await agent
      .post('/auth')
      .send({ username, password })
      .expect(201);

    const { access_token } = login.body;

    const check = await agent
      .get('/auth')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(200);

    expect(check.body).toHaveProperty('id');
    expect(check.body).toHaveProperty('username');
    expect(check.body.id).toEqual(id);
  });
});
