import axios from "axios";

import { config } from "@/config";

const { apiBaseUrl } = config;

export const api = axios.create({ baseURL: apiBaseUrl });

export const setupAxiosDefaults = async () => {
    const emailAuthData: any = localStorage.getItem('emailAuth');
    const googleAuthData: any = localStorage.getItem('googleAuth');

    const googleData: any = googleAuthData ? JSON.parse(googleAuthData) : null;
    const emailData: any = emailAuthData ? JSON.parse(emailAuthData) : null;

    if (googleData && googleData.token) {
        const googleToken = googleData.token;
        axios.defaults.headers.common['X-Auth-Google'] = googleToken;
        return;
    }

    if (emailData && emailData.email) {
        const emailEmail = emailData.email;
        axios.defaults.headers.common['X-Auth-Email'] = emailEmail;
        return;
    }
}