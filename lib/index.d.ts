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
    list(count?: number, offset?: number): Promise<AxiosResponse<{
        members: Member[];
    }>>;
    get(emailOrMd5: string): Promise<AxiosResponse<Member>>;
    setStatus(email: string, status: Status): Promise<AxiosResponse<any>>;
    setStatusIfNew(email: string, status: Status): Promise<AxiosResponse<any>>;
    remove(emailOrMd5: string): Promise<AxiosResponse<any>>;
};
