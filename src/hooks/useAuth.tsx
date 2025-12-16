import { useAuth as useAuthContext } from "../contexts/AuthContext";

// Simple re-export so components can import from "hooks" instead of the context file.
export function useAuth() {
    return useAuthContext();
}


