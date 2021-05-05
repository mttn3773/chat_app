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
exports.deleteUserService = exports.getAllUsersService = exports.createUserService = exports.validateUserData = void 0;
const apiResponse_1 = require("./../utils/apiResponse");
const User_1 = require("../entity/User");
const argon2_1 = require("argon2");
const validateUserData = ({ username, email, }) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailTaken = yield User_1.User.findOne({ where: { email } });
    if (isEmailTaken) {
        return [{ msg: "Email is already taken", param: "email" }];
    }
    const isUsernameTaken = yield User_1.User.findOne({ where: { username } });
    if (isUsernameTaken) {
        return [{ msg: "Username is already taken", param: "username" }];
    }
    return null;
});
exports.validateUserData = validateUserData;
const createUserService = ({ email, password, username, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationErrors = yield exports.validateUserData({ username, email });
        if (validationErrors) {
            return apiResponse_1.errorResponse({ status: 400, errors: validationErrors });
        }
        const hashedPassword = yield argon2_1.hash(password);
        const user = new User_1.User({ email, username, password: hashedPassword });
        yield user.save();
        user.password = undefined;
        return apiResponse_1.successResponse({
            msg: "User created",
            data: { user },
        });
    }
    catch (e) {
        return apiResponse_1.errorResponse({});
    }
});
exports.createUserService = createUserService;
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find();
        return apiResponse_1.successResponse({ data: { users } });
    }
    catch (error) {
        console.log(error);
        return apiResponse_1.errorResponse({});
    }
});
exports.getAllUsersService = getAllUsersService;
const deleteUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    yield User_1.User.delete({});
    const users = yield User_1.User.find();
    return apiResponse_1.successResponse({
        msg: "Users delted",
        data: { users },
    });
});
exports.deleteUserService = deleteUserService;
//# sourceMappingURL=user.services.js.map