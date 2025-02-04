import axios, { type AxiosResponse } from 'axios';
import { GetEnvService } from './GetEnvService';

/**
 * APIに関する処理を行う
 */
export class ApiService {
    /**
     * GET APIを実行
     */
    public static async callGetApi<T>(url: string): Promise<T> {
        return axios
            .get(GetEnvService.getBaseApiUrl() + url)
            .then((response: AxiosResponse<T>) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
    /**
     * POST APIを実行
     */
    public static async callPostApi<T>(url: string, data: T): Promise<T> {
        return axios
            .post(GetEnvService.getBaseApiUrl() + url, data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response: AxiosResponse<T>) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    /**
     * PUT APIを実行
     */
    public static async callPutApi<T>(url: string, data?: T): Promise<void> {
        return axios
            .put(GetEnvService.getBaseApiUrl() + url, data, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(() => {
                return;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    /**
     * DELETE APIを実行
     */
    public static async callDeleteApi(url: string): Promise<void> {
        return axios
            .delete(GetEnvService.getBaseApiUrl() + url)
            .then(() => {
                return;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
}
