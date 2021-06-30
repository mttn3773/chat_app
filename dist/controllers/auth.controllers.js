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
exports.login = exports.logout = exports.me = void 0;
const auth_services_1 = require("./../services/auth.services");
const me = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, response } = auth_services_1.meService(req);
    return res
        .status(status)
        .json(Object.assign({}, response))
        .end();
});
exports.me = me;
const logout = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, response } = yield auth_services_1.logoutService(req);
    return res
        .status(status)
        .json(Object.assign({}, response))
        .end();
});
exports.logout = logout;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    auth_services_1.loginService(req, res, next);
});
exports.login = login;
//# sourceMappingURL=auth.controllers.js.map