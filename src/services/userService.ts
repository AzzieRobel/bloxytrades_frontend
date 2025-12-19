import { api } from "./api";
import { authService } from ".";

export class UserService {
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
}