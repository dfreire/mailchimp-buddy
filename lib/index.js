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
        list() {
            return __awaiter(this, void 0, void 0, function* () {
                return yield axios_1.default.get(`${baseUrl}?count=1000000`, { headers });
            });
        },
        get(email) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield axios_1.default.get(`${baseUrl}/${md5(email)}`, { headers });
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
                const data = { email_address: email, status_if_new: status };
                return yield axios_1.default.put(`${baseUrl}/${md5(email)}`, data, { headers });
            });
        },
    };
}
exports.default = default_1;
function md5(email) {
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
}
