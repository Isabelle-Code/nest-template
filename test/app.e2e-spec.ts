import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Checking Account Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/accounts/checking (POST) ', () => {
    const accNumber: string = '99999';
    return request(app.getHttpServer())
      .get(`/accounts/checking/${accNumber}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `Account ${accNumber} does not exists`,
      });
  });

  afterAll((done) => {
    done();
  });
});
