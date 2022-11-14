import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

jest.setTimeout(50000);

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth (POST)', async () => {
		const id = '09c9a38e-15da-499d-8d9a-23f1dc98d965';
		const email = 'username_auth_post@testapp.com';
		const username = 'username_auth_post';
		const password = '12345678';

		const agent = request(app.getHttpServer());

		await agent.put(`/user/${id}`).send({ email, username, password }).expect(201);

		const login = await agent.post('/auth').send({ username, password }).expect(201);

		expect(login.body.response).toHaveProperty('access_token');
	});

	it('/auth (GET)', async () => {
		const id = 'b5b2e363-f961-4602-b5b8-60943ab602d9';
		const email = 'test@testapp2.com';
		const username = 'test_app2';
		const password = '12345678';

		const agent = request(app.getHttpServer());

		await agent.put(`/user/${id}`).send({ email, username, password }).expect(201);

		const login = await agent.post('/auth').send({ username, password }).expect(201);

		const { access_token } = login.body.response;

		const check = await agent
			.get('/auth')
			.set('Authorization', `Bearer ${access_token}`)
			.expect(200);

		expect(check.body.response).toHaveProperty('id');
		expect(check.body.response).toHaveProperty('username');
		expect(check.body.response.id).toEqual(id);
	});
});
