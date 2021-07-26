interface cliReturnType {
    accessToken: string;
    refreshToken: string;
    clientSecret: string;
    answers?: object;
}
export default function (instance?: string, clientId?: string, clientSecret?: string, refreshToken?: string): Promise<cliReturnType>;
export {};
