interface cliReturnType {
    accessToken: string;
    refreshToken: string;
    clientSecret: string;
}
export default function (instance?: string, clientId?: string, clientSecret?: string, refreshToken?: string): Promise<cliReturnType>;
export {};
