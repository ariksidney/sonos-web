const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const EXPIRES_TS = "expires_ts";

const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    saveToken(accessToken: string) {
        localStorage.setItem(TOKEN_KEY, accessToken);
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },

    saveRefreshToken(refreshToken: string) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    },

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    },

    setExpiresIn(expiresInSeconds: number) {
        const nowTs = Math.round(new Date().getTime() / 1000);
        localStorage.setItem(EXPIRES_TS, (nowTs + expiresInSeconds).toString());
    },

    removeExpiresIn() {
        localStorage.removeItem(EXPIRES_TS);
    },

    isExpired() {
        const expireTs = localStorage.getItem(EXPIRES_TS);
        if (expireTs === null) {
            return true;
        }
        const nowTs = Math.round(new Date().getTime() / 1000);
        return nowTs > parseInt(expireTs);
    }
}

export { TokenService };

export interface Tokens {
    access_token: string,
    refresh_token: string,
    expires_in: number
}