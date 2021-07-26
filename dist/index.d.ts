interface cliReturnType {
    accessToken: string;
    refreshToken: string;
    clientId: string;
    clientSecret: string;
    instanceName: string;
}
export default function (instance?: string, clientId?: string, clientSecret?: string, refreshToken?: string): Promise<cliReturnType>;
export {};
