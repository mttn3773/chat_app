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
exports.updateUserAvatar = exports.resetPasswordService = exports.deleteUserService = exports.getAllUsersService = exports.createUserService = exports.validateUserData = exports.verifyUserService = exports.sendVerificationEmailService = exports.findUserByIdService = exports.sendResetPasswordEmailService = exports.findUserByEmail = void 0;
const argon2_1 = require("argon2");
const fs_1 = require("fs");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../config"));
const User_1 = require("../entity/User");
const sendResetPasswordEmail_1 = require("./../nodemailer/sendResetPasswordEmail");
const sendVerificationEmail_1 = require("./../nodemailer/sendVerificationEmail");
const apiResponse_1 = require("./../utils/apiResponse");
const baseUrl_1 = require("./../utils/baseUrl");
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ where: { email } });
        if (!user) {
            return apiResponse_1.errorResponse({
                errors: [{ msg: "Couldn't find this user", param: "email" }],
            });
        }
        return apiResponse_1.successResponse({ data: { user } });
    }
    catch (error) {
        return apiResponse_1.errorResponse({});
    }
});
exports.findUserByEmail = findUserByEmail;
const sendResetPasswordEmailService = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, id } = user;
        const token = jsonwebtoken_1.sign({ id }, config_1.default.jwtSecret, {
            expiresIn: "1d",
        });
        const url = baseUrl_1.baseUrl(req);
        yield sendResetPasswordEmail_1.sendResetPasswordEmail(email, token, url);
        return apiResponse_1.successResponse({
            status: 200,
            msg: "Reset password link has been sent",
        });
    }
    catch (error) {
        return apiResponse_1.errorResponse({});
    }
});
exports.sendResetPasswordEmailService = sendResetPasswordEmailService;
const findUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne(id);
        if (!user)
            return apiResponse_1.errorResponse({
                status: 500,
                errors: [{ msg: "Couldn't fetch the user" }],
            });
        return apiResponse_1.successResponse({ data: { user } });
    }
    catch (error) {
        return apiResponse_1.errorResponse({});
    }
});
exports.findUserByIdService = findUserByIdService;
const sendVerificationEmailService = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, id } = user;
        const token = jsonwebtoken_1.sign({ id }, config_1.default.jwtSecret, {
            expiresIn: "1d",
        });
        const url = baseUrl_1.baseUrl(req);
        yield sendVerificationEmail_1.sendVerificationEmail(email, token, url);
        return apiResponse_1.successResponse({
            status: 200,
            msg: "Verification link has been sent",
        });
    }
    catch (error) {
        return apiResponse_1.errorResponse({});
    }
});
exports.sendVerificationEmailService = sendVerificationEmailService;
const verifyUserService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = jsonwebtoken_1.verify(token, config_1.default.jwtSecret);
        if (!id) {
            return apiResponse_1.errorResponse({
                status: 500,
                errors: [{ msg: "Verification link expired" }],
            });
        }
        const data = yield User_1.User.update({ id }, { verified: true });
        return apiResponse_1.successResponse({
            status: 200,
            msg: "Account verified",
            data,
        });
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.TokenExpiredError) {
            return apiResponse_1.errorResponse({
                status: 400,
                errors: [{ msg: "Verification link expired" }],
            });
        }
        return apiResponse_1.errorResponse({});
    }
});
exports.verifyUserService = verifyUserService;
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
const resetPasswordService = (password, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = jsonwebtoken_1.verify(token, config_1.default.jwtSecret);
        const hashedPassword = yield argon2_1.hash(password);
        yield User_1.User.update({ id }, { password: hashedPassword });
        return apiResponse_1.successResponse({ msg: "Password updated" });
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.TokenExpiredError) {
            return apiResponse_1.errorResponse({
                status: 400,
                errors: [{ msg: "Verification link expired" }],
            });
        }
        return apiResponse_1.errorResponse({});
    }
});
exports.resetPasswordService = resetPasswordService;
const updateUserAvatar = (user, avatar) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(user.avatar === config_1.default.folders.defaultProfilePicture)) {
            fs_1.unlink(`${config_1.default.folders.profilePicturesFolder}/${user.avatar}`, () => { });
        }
        yield User_1.User.update({ id: user.id }, { avatar });
        return { status: 200, response: { success: true, msg: "Image uploaded" } };
    }
    catch (error) {
        return apiResponse_1.errorResponse({});
    }
});
exports.updateUserAvatar = updateUserAvatar;
//# sourceMappingURL=user.services.js.map