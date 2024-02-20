import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
require("dotenv").config();
import { AppModule } from "../src/app/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", async () => {
    const { body } = await request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect({ message: "Welcome to Platform CU Backend System!" });

    console.log('response.body', body);
  });
});
