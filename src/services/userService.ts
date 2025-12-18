import { getToken } from "@/utils/auth";
import { api } from "./api";

export class UserService {
    async headers() {
        const token = getToken();
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    async updateProfile(data: { newUsername?: string, newEmail?: string }) {
        const headers = await this.headers();
        const res = await api.post("/users/update-profile", data, headers);
        return res.data;
    }

    async changePassword(data: { currentPassword: string, newPassword: string }) {
        const headers = await this.headers();
        const res = await api.post("/users/change-password", data, headers);
        return res.data;
    }
}