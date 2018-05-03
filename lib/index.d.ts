import { AxiosResponse } from 'axios';
export interface Config {
    apiKey: string;
    listId: string;
}
export default function (config: Config): {
    list(config: Config): Promise<AxiosResponse<any>>;
    subscribe(email: string, config: Config): Promise<AxiosResponse<any>>;
    unsubscribe(email: string, config: Config): Promise<AxiosResponse<any>>;
    subscribeIfNew(email: string, config: Config): Promise<AxiosResponse<any>>;
    remove(email: string, config: Config): Promise<AxiosResponse<any>>;
};
