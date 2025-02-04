import { DEFAULT_BASE_API_URL } from '@/constants/ApiConstants';

/**
 * 環境変数を取得するサービス
 */
export class GetEnvService {
    /**
     * バックエンドAPIのURLを取得する。もし環境変数が設定されていない場合はデフォルト値を返す
     * @returns バックエンドAPIのURL
     */
    public static getBaseApiUrl(): string {
        return import.meta.env.VITE_BASE_API_URL || DEFAULT_BASE_API_URL;
    }
}
