import { api } from "./api";

export class AuthService {
    async login(identifier: string, password: string): Promise<AuthResponse> {
        const res = await api.post("/auth/login", { identifier, password });
        return res.data;
    }

    async register(username: string, email: string, password: string): Promise<AuthResponse> {
        const res = await api.post<AuthResponse>("/auth/register", { username, email, password });
        return res.data;
    }

    async loginWithGoogle(idToken: string): Promise<AuthResponse> {
        const res = await api.post<AuthResponse>("/auth/google", { idToken });
        return res.data;
    }
}