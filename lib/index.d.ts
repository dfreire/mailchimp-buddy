import { AxiosResponse } from 'axios';
export interface Config {
    apiKey: string;
    listId: string;
}
export interface Member {
    id?: string;
    email_address: string;
    status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending' | 'transactional';
}
export default function (config: Config): {
    list(): Promise<AxiosResponse<any>>;
    get(email: string): Promise<AxiosResponse<any>>;
    subscribe(email: string): Promise<AxiosResponse<any>>;
    unsubscribe(email: string): Promise<AxiosResponse<any>>;
    subscribeIfNew(email: string): Promise<AxiosResponse<any>>;
    unsubscribeIfNew(email: string): Promise<AxiosResponse<any>>;
    remove(email: string): Promise<AxiosResponse<any>>;
};
