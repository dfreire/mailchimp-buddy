import { AxiosResponse } from 'axios';
export interface Config {
    apiKey: string;
    listId: string;
}
export interface Member {
    id?: string;
    email_address: string;
    status: Status;
}
export declare type Status = 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending' | 'transactional';
export default function (config: Config): {
    list(): Promise<AxiosResponse<{
        members: Member[];
    }>>;
    get(email: string): Promise<AxiosResponse<Member>>;
    setStatus(email: string, status: Status): Promise<AxiosResponse<any>>;
    setStatusIfNew(email: string, status: Status): Promise<AxiosResponse<any>>;
};
