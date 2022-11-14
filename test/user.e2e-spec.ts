import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

jest.setTimeout(50000);

describe('UserController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
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
		const id = 'ab7add6c-a6d7-4c00-983b-6d9e35b7050d';
		const email = 'test@test2.com';
		const username = 'test_2';
		const password = '12345678';

		const agent = request(app.getHttpServer());

		await agent.put(`/user/${id}`).send({ email, username, password }).expect(201);

		const login = await agent.post('/auth').send({ username, password }).expect(201);

		const { access_token } = login.body.response;

		const testRoute = await agent
			.get('/user/test')
			.set('Authorization', `Bearer ${access_token}`)
			.expect(200);

		expect(testRoute.body.response).toBe(`Hello, ${username}`);
	});

	it('/user/:id (GET)', async () => {
		const id = 'e51546e0-ee68-4698-a006-62d657c9fa77';
		const email = 'test@test3.com';
		const username = 'test_3';
		const password = '12345678';

		const agent = request(app.getHttpServer());

		await agent.put(`/user/${id}`).send({ email, username, password }).expect(201);

		const user = await agent.get(`/user/${id}`).expect(200);

		expect(user.body.response).toHaveProperty('id');
		expect(user.body.response).toHaveProperty('username');
		expect(user.body.response).toHaveProperty('email');
	});

	it('/user/:id (GET) should return UserNotFound error', async () => {
		// unexisting uuid
		const id = 'fb0ca10d-2229-40d9-aefd-a67dfcef2b20';

		const agent = request(app.getHttpServer());
		const user = await agent.get(`/user/${id}`).expect(400);

		expect(user.body).toHaveProperty('message');
		expect(user.body.message).toBe('User Not Found');
	});
});
