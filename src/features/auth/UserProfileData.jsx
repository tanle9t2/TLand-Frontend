import MiniSpinner from "../../ui/MiniSpinner"
import useGetUserInfo from "./useGetUserInfo"
import UserProfile from "./UserProfile"

function UserProfileData() {
    const { isLoading, user } = useGetUserInfo()
    if (isLoading) return <MiniSpinner />
    return (
        <UserProfile user={user} />
    )
}

export default UserProfileData
