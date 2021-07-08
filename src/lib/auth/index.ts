import { get, writable } from "svelte/store";
import * as config from "$lib/config.json";

import oidc from "oidc-client";
import type { UserManager, Profile, UserManagerSettings } from "oidc-client";

import axios from "axios";

export class Auth {
    settings: UserManagerSettings = null;
    userManager: UserManager = null;

    isLoading = writable<boolean>(true);
    isAuthenticated = writable<boolean>(false);
    accessToken = writable<string>(null);
    idToken = writable<string>(null);
    userInfo = writable<Profile>(null);
    authError = writable<Error>(null);

    constructor(settings: UserManagerSettings) {
        this.settings = settings;

        axios.interceptors.request.use((config) => {
            if (get(this.accessToken))
                config.headers["Authorization"] = "Bearer " + get(this.accessToken);
            
            return config;
        }, error => Promise.reject(error));
    }

    async onMount() {
        this.userManager = new oidc.UserManager(this.settings);
        this.userManager.events.addUserLoaded(user => {
            this.isAuthenticated.set(true);
            this.accessToken.set(user.access_token);
            this.idToken.set(user.id_token);
            this.userInfo.set(user.profile);
        });
        this.userManager.events.addUserUnloaded(() => {
            this.isAuthenticated.set(false);
            this.idToken.set(null);
            this.accessToken.set(null);
            this.userInfo.set(null);
        });
        this.userManager.events.addSilentRenewError(error => {
            this.authError.set(new Error(`SilentRenewError: ${error.message}`));
        });

        const params = new URLSearchParams(window.location.hash);
        if (!params.has("error") && !params.has("code") && !get(this.isAuthenticated)) {
            this.refreshToken();
        }

        if (params.has("error")) {
            this.authError.set(new Error(params.get("error_description")));
        }

        if (params.has("code")) {
            const response = await this.userManager.signinCallback();

            let state = (response && response.state) || {};
            const url = state && state.targetUrl ? state.targetUrl : window.location.pathname;

            state = { ...state, isRedirectCallback: true };
            history.replaceState(state, "", url);

            this.authError.set(null);
        } else if (params.has("state")) {
            await this.userManager.signinCallback();
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }

        this.isLoading.set(false);
    }

    async refreshToken() {
        try {
            await this.userManager.signinSilent();
            return true;
        } catch (error) {
            this.authError = error.message;
            return false;
        }
    }

    async login(preserveRoute: boolean = true, callbackUrl: string = null) {
        const redirect_uri = callbackUrl || window.location.href;
        const appState = preserveRoute
            ? {
                    pathname: window.location.pathname,
                    search: window.location.search,
              }
            : {};
        await this.userManager.signinRedirect({ redirect_uri, appState });
    }

    async logout(logoutUrl: string = null) {
        const returnTo = logoutUrl || window.location.href;
        
        this.userManager.signoutRedirect({ post_logout_redirect_uri: returnTo });
    }
}

export const auth = new Auth({
    authority: config.api_url,
    client_id: "dashboard",
    redirect_uri: "http://localhost:3000/",
    post_logout_redirect_uri: "http://localhost:3000/",
    response_type: "id_token token",
    scope: "openid profile",
    automaticSilentRenew: true
});
