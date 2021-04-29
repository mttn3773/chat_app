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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.deleteAllUsers = exports.getAllUsers = void 0;
const apiResponse_1 = require("./../utils/apiResponse");
const User_1 = require("../entity/User");
const argon2_1 = require("argon2");
const getAllUsers = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find();
        return apiResponse_1.successResponse({ res, data: { users } });
    }
    catch (error) {
        return apiResponse_1.errorResponse({ res });
    }
});
exports.getAllUsers = getAllUsers;
const deleteAllUsers = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.User.delete({});
    const users = yield User_1.User.find();
    return apiResponse_1.successResponse({ res, msg: "Users delted", data: users });
});
exports.deleteAllUsers = deleteAllUsers;
const createUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        const isEmailTaken = yield User_1.User.findOne({ where: { email } });
        if (isEmailTaken) {
            return apiResponse_1.errorResponse({
                res,
                errors: [{ msg: "Email is already taken", param: "email" }],
            });
        }
        const isUsernameTaken = yield User_1.User.findOne({ where: { username } });
        if (isUsernameTaken) {
            return apiResponse_1.errorResponse({
                res,
                errors: [{ msg: "Username is already taken", param: "username" }],
            });
        }
        const hashedPassword = yield argon2_1.hash(password);
        const user = User_1.User.create({
            password: hashedPassword,
            email,
            username,
        });
        yield user.save();
        user.password = undefined;
        return apiResponse_1.successResponse({ res, msg: "User Created", data: { user } });
    }
    catch (error) {
        return apiResponse_1.errorResponse({ res });
    }
});
exports.createUser = createUser;
//# sourceMappingURL=user.controllers.js.map