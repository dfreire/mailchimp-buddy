import * as crypto from 'crypto';
import axios, { AxiosResponse } from 'axios';

export interface Config {
    apiKey: string;
    listId: string;
}

interface Member {
    id?: string;
    email_address: string;
    status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending' | 'transactional';
}

export default function (config: Config) {
    const baseUrl = `https://us18.api.mailchimp.com/3.0/lists/${config.listId}/members`;
    const authHeader = { Authorization: `apikey ${config.apiKey}` };
    const headers = { ...authHeader };

    return {
        async list() {
            return await axios.get(baseUrl, { headers });
        },

        async subscribe(email: string) {
            const data = { status: 'subscribed' };
            return await axios.patch(`${baseUrl}/${md5(email)}`, data, { headers });
        },

        async unsubscribe(email: string) {
            const data = { status: 'unsubscribed' };
            return await axios.patch(`${baseUrl}/${md5(email)}`, data, { headers });
        },

        async subscribeIfNew(email: string) {
            const data = { email_address: email, status_if_new: 'subscribed' };
            return await axios.put(`${baseUrl}/${md5(email)}`, data, { headers });
        },

        async remove(email: string) {
            return await axios.delete(`${baseUrl}/${md5(email)}`, { headers });
        },
    }
}

function md5(email: string) {
    return crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
}
