interface cliReturnType {
    accessToken: string;
    refreshToken: string;
}
export default function (instance?: string, clientId?: string, refreshToken?: string): Promise<cliReturnType>;
