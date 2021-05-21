"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mockOrmConfig_1 = require("./mockOrmConfig");
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const config = mockOrmConfig_1.createMockOrmConfig();
    yield typeorm_1.createConnection(config);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.User.delete({});
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.User.delete({});
}));
test("test GET - /users", (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(index_1.default)
        .get("/api/users")
        .expect((res) => {
        const { body } = res;
        expect(body).toHaveProperty("success", true);
        const { users } = body.data;
        expect(users).toHaveLength(0);
    });
    done();
}));
test("test POST - /users", (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(index_1.default)
        .post("/api/users")
        .send({ email: "bob@bob.com", password: "12345678", username: "bob" })
        .expect((res) => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = res;
        expect(body).toHaveProperty("success", true);
        expect(body.data).toHaveProperty("user");
        console.log(body);
        const { user } = body.data;
        expect(user).toHaveProperty("email", "bob@bob.com");
        expect(user).toHaveProperty("id");
        expect(user).not.toHaveProperty("password");
        const user_ = yield User_1.User.findOne();
        expect(user_).toHaveProperty("email", "bob@bob.com");
        expect(user_).toHaveProperty("id");
    }));
    done();
}));
test("test POST - /users (WITH NO USER DATA PROVIDED)", (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(index_1.default)
        .post("/api/users")
        .send({})
        .expect((res) => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = res;
        expect(body).toHaveProperty("success", false);
        expect(body).toHaveProperty("errors");
        const { errors } = body;
        expect(errors).toHaveLength(3);
        const user_ = yield User_1.User.findOne();
        expect(user_).toBeFalsy();
    }));
    done();
}));
test("test POST - /users (WITH INVALID EMAIL)", (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(index_1.default)
        .post("/api/users")
        .send({ email: "some random invalid string", password: "12345678" })
        .expect((res) => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = res;
        expect(body).toHaveProperty("success", false);
        expect(body).toHaveProperty("errors");
        const { errors } = body;
        expect(errors).toHaveLength(2);
        expect(errors[0]).toHaveProperty("param", "email");
        const user_ = yield User_1.User.findOne();
        expect(user_).toBeFalsy();
    }));
    done();
}));
//# sourceMappingURL=user.test.js.map