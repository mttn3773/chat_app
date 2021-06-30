import { createMockOrmConfig } from "./mockOrmConfig";
import { createConnection } from "typeorm";
import { User } from "../entity/User";
import request from "supertest";
import app from "../index";

beforeAll(async () => {
  const config = createMockOrmConfig();
  await createConnection(config);
});

afterAll(async () => {
  await User.delete({});
});
afterEach(async () => {
  await User.delete({});
});
test("test GET - /users", async (done) => {
  await request(app)
    .get("/api/users")
    .expect((res) => {
      const { body } = res;
      expect(body).toHaveProperty("success", true);
      const { users } = body.data;
      expect(users).toHaveLength(0);
    });
  done();
});

test("test POST - /users", async (done) => {
  await request(app)
    .post("/api/users")
    .send({ email: "bob@bob.com", password: "12345678", username: "bob" })
    .expect(async (res) => {
      // Check created user object from response
      const { body } = res;
      expect(body).toHaveProperty("success", true);
      expect(body.data).toHaveProperty("user");
      console.log(body);

      const { user } = body.data;
      expect(user).toHaveProperty("email", "bob@bob.com");
      expect(user).toHaveProperty("id");
      expect(user).not.toHaveProperty("password");
      // Check if user object was saved to db
      const user_ = await User.findOne();
      expect(user_).toHaveProperty("email", "bob@bob.com");
      expect(user_).toHaveProperty("id");
    });
  done();
});

test("test POST - /users (WITH NO USER DATA PROVIDED)", async (done) => {
  await request(app)
    .post("/api/users")
    .send({})
    .expect(async (res) => {
      // Check created user object from response
      const { body } = res;
      expect(body).toHaveProperty("success", false);
      expect(body).toHaveProperty("errors");
      const { errors } = body;
      expect(errors).toHaveLength(3);
      // Check if user object wasn't saved to db
      const user_ = await User.findOne();
      expect(user_).toBeFalsy();
    });
  done();
});

test("test POST - /users (WITH INVALID EMAIL)", async (done) => {
  await request(app)
    .post("/api/users")
    .send({ email: "some random invalid string", password: "12345678" })
    .expect(async (res) => {
      // Check created user object from response
      const { body } = res;
      expect(body).toHaveProperty("success", false);
      expect(body).toHaveProperty("errors");
      const { errors } = body;
      expect(errors).toHaveLength(2);
      expect(errors[0]).toHaveProperty("param", "email");
      // Check if user object wasn't saved to db
      const user_ = await User.findOne();
      expect(user_).toBeFalsy();
    });
  done();
});
