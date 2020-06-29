import queryString from 'query-string';
import jwt_decode from 'jwt-decode';
import { CognitoConfig } from './cognitoconfig';

export function cognitoCodeLoginCallback(uri: ?string) {
    console.log("Logging in...");
    console.log(uri);
    let params = queryString.parseUrl(uri);
    console.log("params");
    console.log(params);
    let auth_code = params.query.code;
    let token_data = {
        code: auth_code,
        grant_type: CognitoConfig.grant_type,
        redirect_uri: CognitoConfig.redirect_login_url,
        client_id: CognitoConfig.client_id
    }
    console.log("Token POST")
    console.log(CognitoConfig.token_url);
    console.log(token_data);

    let request = $.ajax({
        method: 'POST',
        url: /*'https://cors-anywhere.herokuapp.com/' + */CognitoConfig.token_url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'/*,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, application/x-www-form-urlencoded, Authorization"*/
        },
        contentType: 'application/x-www-form-urlencoded',
        /*body: formBody*/
        data: token_data
    });
    request.done(function(response) {
       console.log("login response");
       console.log(response);
       let decoded_token = jwt_decode(response.id_token);
       console.log(decoded_token);
       console.log(decoded_token["cognito:username"]);
       localStorage.setItem("token_info", response);
       localStorage.setItem("access_token", response.access_token);
       localStorage.setItem("refresh_token", response.refresh_token);
       localStorage.setItem('userId', decoded_token["cognito:username"]);
       window.location.href  = "/";
    });

    request.fail(function(response) {
        console.log("request failed");
        console.log(response);
        window.location.href  = "/";
    });
}

export function cognitoSignOutCallback(uri: ?string) {
    console.log("Signing out...");
    console.log(uri);
    window.location.href  = "/";
}

export function cognitoCheckLogin() {
    console.log('Trying to read user credentials...');
    let userId = localStorage.getItem('userId');
    if (!userId) {
        console.log('User not logged in - redirecting to Cognito login page');
        console.log('login url');
        console.log(CognitoConfig.login_url);
        window.location.href  = CognitoConfig.login_url;
    }
    console.log(userId);
}

export function cognitoSignOut() {
    localStorage.removeItem("token_info");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem('userId');
    window.location.href = '/';
}