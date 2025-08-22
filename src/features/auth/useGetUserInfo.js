import { useQuery } from "@tanstack/react-query";
import { getUserInfo, } from "../../services/UserService";


export default function useGetUserInfo() {
    const { isLoading, data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => getUserInfo(),
    });

    return { isLoading, user };
}