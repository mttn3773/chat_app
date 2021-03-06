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
exports.resetPassword = exports.createUser = exports.forgotPassword = exports.sendVerificationLink = exports.verifyUser = exports.deleteAllUsers = exports.getUserById = exports.getAllUsers = void 0;
const user_services_1 = require("../services/user.services");
const getAllUsers = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, response } = yield user_services_1.getAllUsersService();
    return res
        .status(status)
        .json(Object.assign({}, response))
        .end();
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status, response } = yield user_services_1.findUserByIdService(id);
    return res
        .status(status)
        .json(Object.assign({}, response))
        .end();
});
exports.getUserById = getUserById;
const deleteAllUsers = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, response } = yield user_services_1.deleteUserService();
    return res
        .status(status)
        .json(Object.assign({}, response))
        .end();
});
exports.deleteAllUsers = deleteAllUsers;
const verifyUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    const { status, response } = yield user_services_1.verifyUserService(token);
    return res
        .status(status)
        .json(Object.assign({}, response))
        .end();
});
exports.verifyUser = verifyUser;
const sendVerificationLink = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { status, response } = yield user_services_1.findUserByEmail(email);
    if (!response.success) {
        return res
            .status(status)
            .json(Object.assign({}, response))
            .end();
    }
    const user = response.data.user;
    const { status: status_, response: response_ } = yield user_services_1.sendVerificationEmailService(user, req);
    return res.status(status_).json(Object.assign({}, response_));
});
exports.sendVerificationLink = sendVerificationLink;
const forgotPassword = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { status, response } = yield user_services_1.findUserByEmail(email);
    if (!response.success) {
        return res
            .status(status)
            .json(Object.assign({}, response))
            .end();
    }
    const user = response.data.user;
    const { status: status_, response: response_ } = yield user_services_1.sendResetPasswordEmailService(user, req);
    return res.status(status_).json(Object.assign({}, response_));
});
exports.forgotPassword = forgotPassword;
const createUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    const { status, response } = yield user_services_1.createUserService({
        email,
        username,
        password,
    });
    if (response.success) {
        user_services_1.sendVerificationEmailService(response.data.user, req);
    }
    return res
        .status(status)
        .json(Object.assign({}, response))
        .end();
});
exports.createUser = createUser;
const resetPassword = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, token } = req.body;
    const { response, status } = yield user_services_1.resetPasswordService(password, token);
    return res
        .status(status)
        .json(Object.assign({}, response))
        .end();
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=user.controllers.js.map