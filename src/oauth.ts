import axios from "axios";
import * as qs from 'qs'

interface getRefreshTokenFunc {
  (username: string, password: string, clientId: string, clientSecret: string): Promise<string>;
}
interface getAccessTokenFunc {
  (clientId: string, clientSecret: string, refreshToken: string): Promise<string>
}
interface oauthReturn {
  getRefreshToken: getRefreshTokenFunc, getAccessToken: getAccessTokenFunc
}

export default function oauth(instance: string): oauthReturn {

  let instanceUrl: string = `https://${instance}.service-now.com`;
  let oauthTokenUrl: string = `${instanceUrl}/oauth_token.do`;
  let headers: object = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  };

  async function getRefreshToken(
    username: string,
    password: string,
    clientId: string,
    clientSecret: string): Promise<string> {

    var response = await axios.post(oauthTokenUrl, qs.stringify({
      "grant_type": "password",
      "client_id": clientId,
      "client_secret": clientSecret,
      "username": username,
      "password": password
    }), {
      headers: headers
    });
    return response.data.refresh_token;
  };

  async function getAccessToken(
    clientId: string,
    clientSecret: string,
    refreshToken: string): Promise<string> {

    var response = await axios.post(oauthTokenUrl, qs.stringify({
      "grant_type": "refresh_token",
      "client_id": clientId,
      "client_secret": clientSecret,
      "refresh_token": refreshToken
    }), {
      headers: headers
    });
    return response.data.access_token;
  }

  return {
    "getRefreshToken": getRefreshToken,
    "getAccessToken": getAccessToken
  };
}