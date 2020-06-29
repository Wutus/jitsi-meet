
class CognitoConfigClass {
    constructor (app_url: ?string, signout_path: ?string, login_path: ?string,
        base_cognito_url: ?string, cognito_oauth_path: ?string, cognito_token_path: ?string, client_id: ?string,
        response_type: ?string, scope: ?string, grant_type: ?string) {
        
        this.app_url = app_url;
        this.signout_path = signout_path;
        this.login_path = login_path;
        this.base_cognito_url = base_cognito_url;
        this.cognito_oauth_path = cognito_oauth_path;
        this.cognito_token_path = cognito_token_path;
        this.client_id = client_id;
        this.response_type = response_type;
        this.scope = scope;
        this.grant_type = grant_type;
        this.redirect_signout_url = `${app_url}/${signout_path}`;
        this.redirect_login_url = `${app_url}/${login_path}`;
        this.login_url = `${base_cognito_url}/${cognito_oauth_path}?client_id=${client_id}&response_type=${response_type}&scope=${scope}&redirect_uri=${this.redirect_login_url}`;
        this.token_url = `${base_cognito_url}/${cognito_token_path}`;
    }
}
export const CognitoConfig = new CognitoConfigClass("https://erystrea.pl:4443", "oauth2/signout", "oauth2/callback", 
    'https://jitsierystrea.auth.us-east-1.amazoncognito.com', 'oauth2/authorize', 'oauth2/token', '1le84rocd5atvccsqiohrpidgu',
    'code', 'aws.cognito.signin.user.admin+email+https://erystrea.pl/jitsiuser+openid+phone+profile', 'authorization_code');
