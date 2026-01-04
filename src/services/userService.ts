import { api } from "./api";
import { authService } from ".";

export class UserService {
    async getProfile() {
        const headers = await authService.headers();
        const res = await api.get("/users/me", headers);
        return res.data as { user: UserState };
    }

    async updateProfile(data: { newUsername?: string, newEmail?: string }) {
        const headers = await authService.headers();
        const res = await api.post("/users/update-profile", data, headers);
        return res.data;
    }

    async changePassword(data: { currentPassword: string, newPassword: string }) {
        const headers = await authService.headers();
        const res = await api.post("/users/change-password", data, headers);
        return res.data;
    }

    async connectRoblox(data: { robloxUserId: string, robloxUsername: string }) {
        const headers = await authService.headers();
        const res = await api.post("/users/connect-roblox", data, headers);
        return res.data;
    }

    async getUserById(userId: string) {
        // Public endpoint, no auth required
        const res = await api.get(`/users/${userId}`);
        return res.data as { user: UserState };
    }
}