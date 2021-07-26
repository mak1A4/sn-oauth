import * as chalk from 'chalk';
import * as inquirer from 'inquirer';
import { QuestionCollection } from "inquirer";
import oauth from "./oauth";

interface cliReturnType {
  accessToken: string, 
  refreshToken: string, 
  clientId: string,
  clientSecret: string,
  instanceName: string
}

export default async function (
  instance?: string,
  clientId?: string,
  clientSecret?: string,
  refreshToken?: string): Promise<cliReturnType> {

  if (instance && clientId && clientSecret && refreshToken) {
    instance = instance as string;
    clientId = clientId as string;
    clientSecret = clientSecret as string;
    refreshToken = refreshToken as string;

    let oauthInstance = oauth(instance);
    let accessToken = await oauthInstance.getAccessToken
      (clientId, clientSecret, refreshToken);

    return {
      "accessToken": accessToken,
      "refreshToken": refreshToken,
      "clientId": clientId,
      "clientSecret": clientSecret,
      "instanceName": instance
    };
  }

  console.log(chalk.green.underline.bold("ServiceNow OAuth 2.0 Authentication"));
  console.log(chalk.blueBright(`To get a Client ID & Client Secret you have to create an OAuth Application Registry record in ServiceNow.
  You just have to provide a name, everything else can be blank.`));
  console.log(chalk.yellow("====================================================="));

  let questionList: Array<QuestionCollection> = [];
  if (!instance) {
    questionList.push({
      name: "instanceName", type: "input", message: "Instance Name:"
    });
  }
  if (!clientId) {
    questionList.push({
      name: "clientId", type: "input", message: "Client ID:"
    });
  }
  if (!clientSecret) {
    questionList.push({
      name: "clientSecret", type: "password", message: "Client Secret:", mask: "*"
    });
  }
  questionList.push({
    name: "user", type: "input", message: "User:"
  });
  questionList.push({
    name: "userPassword", type: "password", message: "Password:", mask: "*"
  });
  questionList.push({
    name: "mfaToken", type: "input", message: "MFA Token (Leave empty if MFA is disabled):"
  });
  /*
  MFA Info from Community Article response:
  https://community.servicenow.com/community?id=community_question&sys_id=d5e843a1db5cdbc01dcaf3231f961987
  This is something that I have successfully done in the past.  You need to do the following:
    - Set up MFA for the service account that is making REST calls
    - Copy the 16 character MFA secret for the service account.  It is a 16-character string stored in the user_multifactor_auth table, in the field multi_factor_secret.  This is a Password 2-way field, so you will need to use GlideEncrypter to decrypt it and copy the value.
    - Find an MFA library for the scripting language you are using to make the REST calls.  For example, if you are using Python you could use PyOTP, or if you are using Node.js, you could use speakeasy (I have used both of these successfully).
    - In your REST authentication step, instead of sending just the password, you need to send the password + the real-time 6-digit code.  So for example:  If the service account password is "Pass123" and the 6-digit authenticator code right now is 987654, then you would send "Pass123987654" as the password. (See step 3 on this docs page)
    https://docs.servicenow.com/bundle/newyork-platform-administration/page/integrate/authentication/task/t_LogOnWithMultifactorAuth.html
  That is all that is required.  As you can see, it's actually pretty simple.
  */

  let answers = await inquirer.prompt(questionList);
  if (!instance) instance = answers.instanceName as string;
  if (!clientId) clientId = answers.clientId as string;
  if (!clientSecret) clientSecret = answers.clientSecret as string;

  let oauthInstance = oauth(instance);
  if (!refreshToken) {
    let userPassword = answers.userPassword;
    if (answers.mfaToken) userPassword += answers.mfaToken
    refreshToken = await oauthInstance.getRefreshToken
      (answers.user, userPassword, clientId, clientSecret);
  }
  let accessToken = await oauthInstance.getAccessToken
    (clientId, clientSecret, refreshToken);

  return {
    "accessToken": accessToken,
    "refreshToken": refreshToken,
    "clientId": clientId,
    "clientSecret": clientSecret,
    "instanceName": instance
  };
};