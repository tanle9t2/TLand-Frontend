import { useQuery } from "@tanstack/react-query";
import { getUSerProfile } from "../../services/UserService";


export default function useGetUserProfile(authenticated) {

    const { isLoading, data: userProfile } = useQuery({
        queryKey: ["profile"],
        queryFn: () => getUSerProfile(),
        enabled: authenticated
    });

    return { isLoading, userProfile };
}