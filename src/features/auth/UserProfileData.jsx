import MiniSpinner from "../../ui/MiniSpinner"
import useGetUserInfo from "./useGetUserInfo"
import UserProfile from "./UserProfile"

function UserProfileData() {
    const { isLoading, user } = useGetUserInfo()

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <MiniSpinner size={36} />
        </div>
    )

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <UserProfile user={user} />
        </div>
    )
}

export default UserProfileData
