import { AxiosResponse } from 'axios';
export interface Config {
    apiKey: string;
    listId: string;
}
export default function (config: Config): {
    list(): Promise<AxiosResponse<any>>;
    subscribe(email: string): Promise<AxiosResponse<any>>;
    unsubscribe(email: string): Promise<AxiosResponse<any>>;
    subscribeIfNew(email: string): Promise<AxiosResponse<any>>;
    remove(email: string): Promise<AxiosResponse<any>>;
};
