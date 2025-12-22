import { useUser } from "@/hooks/useUser";
import { formatDate } from "@/utils"


export const Footer = () => {
    const { user } = useUser();

    return (
        <div className="p-6">
            <p className="text-gray-400 text-sm text-left border-t border-white/20 pt-6">
                User since {formatDate(user.createdAt)}
            </p>
        </div>
    )
}