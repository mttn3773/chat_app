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
exports.localStrategy = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const argon2_1 = require("argon2");
const User_1 = require("../entity/User");
exports.localStrategy = new passport_local_1.Strategy({ usernameField: "email" }, function (email, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOne({ email }, { select: ["password", "email", "id", "username"] });
            if (!user) {
                return done({ msg: "Invalid email", param: "email" }, false);
            }
            const isValid = yield argon2_1.verify(user.password, password);
            if (!isValid) {
                return done({ msg: "Invalid password", param: "password" }, false);
            }
            return done(null, user);
        }
        catch (error) {
            return done({ msg: "Something went wrong" }, false);
        }
    });
});
passport_1.default.serializeUser(function (user, done) {
    return done(null, user.id);
});
passport_1.default.deserializeUser(function (id, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findOne({ where: { id } });
            if (!user) {
                return done({ msg: "Couldn't find a user" }, false);
            }
            return done(null, user);
        }
        catch (e) {
            return done(e, null);
        }
    });
});
//# sourceMappingURL=passport.js.map