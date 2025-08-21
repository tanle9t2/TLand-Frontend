import { useQuery } from "@tanstack/react-query";
import { getUSerProfile } from "../../services/UserService";
import { getAccessToken } from "../../utils/helper";

export default function useGetUserProfile() {
    const { isLoading, data: userProfile } = useQuery({
        queryKey: ["profile"],
        queryFn: () => getUSerProfile(),
        enabled: getAccessToken() ? true : false
    });

    return { isLoading, userProfile };
}