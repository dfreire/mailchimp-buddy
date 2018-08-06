import * as crypto from 'crypto';
import axios, { AxiosResponse } from 'axios';

export interface Config {
    apiKey: string;
    listId: string;
}

export interface Member {
    id?: string;
    email_address: string;
    status: Status;
}

export type Status = 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending' | 'transactional';

export default function (config: Config) {
    const dataCenter = config.apiKey.split('-')[1];
    const baseUrl = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${config.listId}/members`;
    const authHeader = { Authorization: `apikey ${config.apiKey}` };
    const headers = { ...authHeader };

    return {
        async list(count = 1000000, offset = 0): Promise<AxiosResponse<{ members: Member[] }>> {
            return await axios.get<{ members: Member[] }>(`${baseUrl}?count=${count}&offset=${offset}`, { headers });
        },

        async get(emailOrMd5: string): Promise<AxiosResponse<Member>> {
            return await axios.get<Member>(`${baseUrl}/${ensureMd5(emailOrMd5)}`, { headers });
        },

        async setStatus(email: string, status: Status) {
            const data = { status };
            return await axios.patch(`${baseUrl}/${md5(email)}`, data, { headers });
        },

        async setStatusIfNew(email: string, status: Status) {
            const data = { email_address: email.toLowerCase(), status_if_new: status };
            return await axios.put(`${baseUrl}/${md5(email)}`, data, { headers });
        },

        async remove(emailOrMd5: string) {
            return await axios.delete(`${baseUrl}/${ensureMd5(emailOrMd5)}`, { headers });
        },
    }
}

function ensureMd5(emailOrMd5: string): string {
    return isEmail(emailOrMd5) ? md5(emailOrMd5) : emailOrMd5;
}

function isEmail(emailOrMd5: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailOrMd5).toLowerCase());
}

function md5(email: string) {
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
}
