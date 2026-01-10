import { getToken } from "@/utils/auth";
import { api } from "./api";

export class AuthService {
    async headers() {
        const token = getToken();
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    async login(identifier: string, password: string): Promise<AuthResponse> {
        const res = await api.post("/auth/login", { identifier, password });
        return res.data;
    }

    async register(username: string, email: string, password: string): Promise<AuthResponse> {
        const res = await api.post<AuthResponse>("/auth/register", { username, email, password });
        return res.data;
    }

    // google
    async googleLogin(code: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>("/auth/googleLogin", { code });
        return response.data;
    }

    async googleAuth(): Promise<void> {
        const response = await api.get<{ url: string }>("/auth/googleAuth");
        const url = response.data.url;
        // Redirect to Google OAuth
        window.location.href = url;
    }
}