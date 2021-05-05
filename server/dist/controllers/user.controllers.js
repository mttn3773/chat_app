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
const user_services_1 = require("./../services/user.services");
const getAllUsers = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, response } = yield user_services_1.getAllUsersService();
    return res
        .status(status)
        .json(Object.assign({}, response))
        .end();
});
exports.getAllUsers = getAllUsers;
const deleteAllUsers = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, response } = yield user_services_1.deleteUserService();
    return res
        .status(status)
        .json(Object.assign({}, response))
        .end();
});
exports.deleteAllUsers = deleteAllUsers;
const createUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    const { status, response } = yield user_services_1.createUserService({
        email,
        username,
        password,
    });
    return res
        .status(status)
        .json(Object.assign({}, response))
        .end();
});
exports.createUser = createUser;
//# sourceMappingURL=user.controllers.js.map