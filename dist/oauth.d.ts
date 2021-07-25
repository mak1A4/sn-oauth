interface getRefreshTokenFunc {
    (username: string, password: string, clientId: string, clientSecret: string): Promise<string>;
}
interface getAccessTokenFunc {
    (clientId: string, clientSecret: string, refreshToken: string): Promise<string>;
}
interface oauthReturn {
    getRefreshToken: getRefreshTokenFunc;
    getAccessToken: getAccessTokenFunc;
}
export default function oauth(instance: string): oauthReturn;
export {};
