import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unfollower as unfollowerAPI } from "../../services/UserService"
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
export default function useUnFollowUser() {
    const queryClient = useQueryClient()

    const { profile } = useAuth()
    const { isPending, mutate: unfollower } = useMutation({
        mutationFn: ({ followerId }) => unfollowerAPI({ followerId }),
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

    return { isPending, unfollower }
}