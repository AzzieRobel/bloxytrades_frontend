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

    // roblox
    async connectRoblox(data: { robloxUserId: string, robloxUsername: string }) {
        const headers = await authService.headers();
        const res = await api.post("/users/connect-roblox", data, headers);
        return res.data;
    }

    async getMyRobloxAssets(params?: { 
        limit?: number; 
        cursor?: string; 
        assetTypeId?: number 
    }) {
        const headers = await authService.headers();
        const queryParams = new URLSearchParams();
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.cursor) queryParams.append('cursor', params.cursor);
        if (params?.assetTypeId) queryParams.append('assetTypeId', params.assetTypeId.toString());
        
        const queryString = queryParams.toString();
        const url = `/users/me/roblox-assets${queryString ? `?${queryString}` : ''}`;
        const res = await api.get(url, headers);
        return res.data as {
            assets: Array<{
                assetId: string;
                name: string;
                assetType: string;
                createdUtc: string;
                thumbnailUrl?: string;
            }>;
            nextCursor?: string;
        };
    }

    async getUserById(userId: string) {
        // Public endpoint, no auth required
        const res = await api.get(`/users/${userId}`);
        return res.data as { user: UserState };
    }
}