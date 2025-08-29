import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserLadingPage } from "../../services/UserService";

export default function useGetUserLandingPage() {
    const { userId } = useParams()
    const { isLoading, data: landingPage } = useQuery({
        queryKey: ["lading", userId],
        queryFn: () => getUserLadingPage({ userId })
    })
    return { isLoading, landingPage }
}