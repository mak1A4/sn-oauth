import{prompt as e}from"inquirer";import{yellow as t,green as s,blueBright as n}from"chalk";import o from"axios";import{stringify as a}from"qs";async function r(r,c,i){console.log(s("ServiceNow OAuth 2.0 Authentication").bold()),console.log(n("To get a Client ID & Client Secret you have to create\n  an OAuth Application Registry record in ServiceNow. You just have to provide a name, \n  you can leave everything else blank.")),console.log(t("======================================="));let l=[];r||l.push({name:"instanceName",type:"input",message:"Instance Name:"}),c||l.push({name:"clientId",type:"input",message:"Client ID:"}),l.push({name:"user",type:"input",message:"User:"}),l.push({name:"userPassword",type:"password",message:"Password:",mask:"*"}),l.push({name:"clientSecret",type:"password",message:"Client Secret:",mask:"*"});let p=await e(l);r||(r=p.instanceName),c||(c=p.clientId);let u=function(e){let t=`https://${e}.service-now.com/oauth_token.do`,s={"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"};return{getRefreshToken:async function(e,n,r,c){return console.log("username: "+e),console.log("password: "+n),console.log("clientId: "+r),console.log("clientSecret: "+c),(await o.post(t,a({grant_type:"password",client_id:r,client_secret:c,username:e,password:n}),{headers:s})).data.refresh_token},getAccessToken:async function(e,n,r){return(await o.post(t,a({grant_type:"refresh_token",client_id:e,client_secret:n,refresh_token:r}),{headers:s})).data.access_token}}}(r);return i||(i=await u.getRefreshToken(p.user,p.userPassword,c,p.clientSecret)),{accessToken:await u.getAccessToken(c,p.clientSecret,i),refreshToken:i}}export{r as default};