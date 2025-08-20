import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginWithThirdParty } from "../../services/AuthService";
import toast from "react-hot-toast";

export default function useLoginWithThirdParty() {
    const navigate = useNavigate();
    const { isLoading, mutate: thirdPartyLogin } = useMutation({
        mutationFn: ({ partyName }) =>
            loginWithThirdParty({ partyName }),
        onSuccess: (token) => {
            console.log(token)
            navigate("/");
        },
        onError: (err) => {
            toast.error(err.response.data.detail);
        },
    });
    return { isLoading, thirdPartyLogin };
}