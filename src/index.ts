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

  let answers = await inquirer.prompt(questionList);
  if (!instance) instance = answers.instanceName as string;
  if (!clientId) clientId = answers.clientId as string;

  let oauthInstance = oauth(instance);
  if (!refreshToken) {
    refreshToken = await oauthInstance.getRefreshToken
      (answers.user, answers.userPassword, clientId, answers.clientSecret);
  }
  let accessToken = await oauthInstance.getAccessToken
    (clientId, answers.clientSecret, refreshToken);

  return {
    "accessToken": accessToken,
    "refreshToken": refreshToken,
    "clientId": clientId,
    "clientSecret": answers.clientSecret,
    "instanceName": instance
  };
};