import { SESSION_KEYS } from "@/components/utils/contantes";

export const SessionService = {
    setLoggedIn(isLoggedIn: boolean) {
        sessionStorage.setItem(SESSION_KEYS.IS_LOGGED_IN, isLoggedIn.toString());
    },

    isLoggedIn(): boolean {
        return sessionStorage.getItem(SESSION_KEYS.IS_LOGGED_IN) === 'true';
    },

    setUserId(userId: string) {
        sessionStorage.setItem(SESSION_KEYS.USER_ID, userId);
    },

    getUserId(): string | null {
        return sessionStorage.getItem(SESSION_KEYS.USER_ID);
    },

    clearSession() {
        sessionStorage.removeItem(SESSION_KEYS.IS_LOGGED_IN);
        sessionStorage.removeItem(SESSION_KEYS.USER_ID);
    },
};
