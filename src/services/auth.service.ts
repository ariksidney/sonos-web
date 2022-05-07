import { Tokens, TokenService } from "./token.service";
import { getAccessToken } from "./firebase.service";

const OAUTH_ACCESS_TOKEN_URL = "/login/v3/oauth/access";
let refreshing = false;

const AuthService = {
    getAccessToken: async function (authorizationCode: string) {
        const result = await getAccessToken({
            url: OAUTH_ACCESS_TOKEN_URL,
            body: {
                "grant_type": "authorization_code",
                "code": authorizationCode,
                "redirect_uri": import.meta.env.VITE_sonos_redirect_uri,
                "client_id": import.meta.env.VITE_sonos_client_id
            }
        });
        const token = <Tokens>result.data;
        TokenService.saveToken(token.access_token)
        TokenService.saveRefreshToken(token.refresh_token)
        TokenService.setExpiresIn(token.expires_in)
    },

    refreshToken: async function () {
        if (TokenService.isExpired() && !refreshing) {
            refreshing = true;
            console.log('Token expired, renewing')
            const result = await getAccessToken({
                url: OAUTH_ACCESS_TOKEN_URL,
                body: {
                    "grant_type": "refresh_token",
                    "refresh_token": TokenService.getRefreshToken(),
                }
            })
            const token = <Tokens>result.data;
            TokenService.saveToken(token.access_token)
            TokenService.saveRefreshToken(token.refresh_token)
            TokenService.setExpiresIn(token.expires_in)
        }
        refreshing = false;
    },

    signOut() {
        TokenService.removeToken();
        TokenService.removeRefreshToken();
        TokenService.removeExpiresIn();
        window.location.replace('/SignIn');
    },

    isLoggedIn() {
        if (TokenService.getToken() && TokenService.getRefreshToken()) {
            return true;
        } else {
            return false;
        }
    },
}

export default AuthService;