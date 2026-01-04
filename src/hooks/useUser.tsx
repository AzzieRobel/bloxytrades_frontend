import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "@/contexts/context";
import { userService } from "@/services";
import { getToken } from "@/utils/auth";

export function useUser() {
    const { state, update } = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadUser = async () => {
        const token = getToken();
        if (!token) {
            setIsLoading(false);
            return;
        }
        try {
            setIsLoading(true);
            const data = await userService.getProfile();
            update({ user: data.user });
        } catch (err) {
            console.error("Failed to load user profile:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void loadUser();
    }, []);

    const getUser = () => {
        return state.user;
    }

    const changeUsername = async (newUsername: string) => {
        try {
            const result: { user: UserState } = await userService.updateProfile({ newUsername });
            update({ user: { ...result.user } });
        } catch (error: any) { throw error }
    }

    const changeEmail = async (newEmail: string) => {
        try {
            const result = await userService.updateProfile({ newEmail });
            update({ user: result.user });
        } catch (error: any) { throw error }
    }

    const changePassword = async (data: { currentPassword: string, newPassword: string }) => {
        try {
            await userService.changePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword });
        } catch (error: any) { throw error }
    }

    const connectRoblox = async (data: { robloxUserId: string, robloxUsername: string }) => {
        try {
            const result: { user: UserState } = await userService.connectRoblox(data);
            update({ user: { ...result.user } });
            return { success: true, user: result.user };
        } catch (error: any) { throw error }
    }

    return { 
        user: state.user, 
        isLoading,
        getUser, 
        changeEmail, 
        changeUsername, 
        changePassword, 
        connectRoblox,
        reloadUser: loadUser
    };
}
