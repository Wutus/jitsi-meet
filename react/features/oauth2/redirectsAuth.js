import queryString from 'query-string';

export function redirectAuth(uri: ?string) {
    uri = uri.replace('#', '?');
    console.log("Checking if auth response");
    console.log(uri);
    let params = queryString.parseUrl(uri).query;
    console.log("params");
    console.log(params);
    if (!("state" in params && "access_token" in params)) {
        console.log("Missing state or access_token parameter in query - not authorization response");
        return;
    }
    let path = params["state"];
    let token = params["access_token"];
    let final_href = `/${path}?jwt=${token}`;
    console.log(`Auth response - redirecting to ${final_href}`);
    window.location.href = final_href;
}