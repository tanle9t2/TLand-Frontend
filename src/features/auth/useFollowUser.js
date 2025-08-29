import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser as followUserAPI } from "../../services/UserService"
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
export default function useFollowUser() {
    const queryClient = useQueryClient()
    const { profile } = useAuth()
    const { isPending, mutate: followUser } = useMutation({
        mutationFn: ({ followerId }) => followUserAPI({ followerId }),
        onSuccess: ({ data }) => {
            const { followerId } = data
            queryClient.invalidateQueries({
                queryKey: ["follower", profile.id, followerId]
            })
        },
        onError: ({ response }) => {
            toast.error(response.data.detail)
        }
    })

    return { isPending, followUser }
}