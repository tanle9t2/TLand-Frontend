import { useQuery } from "@tanstack/react-query";
import { checkFollow } from "../../services/UserService";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function useCheckUserFollow() {
    const { userId } = useParams()
    const { profile = {}, authenticated } = useAuth()
    const { isLoading, data } = useQuery({
        queryKey: ["follower", profile?.id, userId],
        queryFn: () => checkFollow({ followerId: userId }),
        enabled: authenticated
    });

    return { isLoading, isFollow: data?.data.isFollow };
}