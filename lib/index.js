"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const axios_1 = require("axios");
function default_1(config) {
    const dataCenter = config.apiKey.split('-')[1];
    const baseUrl = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${config.listId}/members`;
    const authHeader = { Authorization: `apikey ${config.apiKey}` };
    const headers = Object.assign({}, authHeader);
    return {
        list(count = 1000000, offset = 0) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield axios_1.default.get(`${baseUrl}?count=${count}&offset=${offset}`, { headers });
            });
        },
        get(emailOrMd5) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield axios_1.default.get(`${baseUrl}/${ensureMd5(emailOrMd5)}`, { headers });
            });
        },
        setStatus(email, status) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = { status };
                return yield axios_1.default.patch(`${baseUrl}/${md5(email)}`, data, { headers });
            });
        },
        setStatusIfNew(email, status) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = { email_address: email.toLowerCase(), status_if_new: status };
                return yield axios_1.default.put(`${baseUrl}/${md5(email)}`, data, { headers });
            });
        },
        remove(emailOrMd5) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield axios_1.default.delete(`${baseUrl}/${ensureMd5(emailOrMd5)}`, { headers });
            });
        },
    };
}
exports.default = default_1;
function ensureMd5(emailOrMd5) {
    return isEmail(emailOrMd5) ? md5(emailOrMd5) : emailOrMd5;
}
function isEmail(emailOrMd5) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailOrMd5).toLowerCase());
}
function md5(email) {
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
}
