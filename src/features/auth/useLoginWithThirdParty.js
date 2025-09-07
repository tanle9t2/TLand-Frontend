import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginWithThirdParty as loginWithThirdPartyAPI } from "../../services/AuthService";
import toast from "react-hot-toast";

export default function useLoginWithThirdParty() {

    const { isLoading, mutate: loginWithThirdParty } = useMutation({
        mutationFn: ({ partyName }) =>
            loginWithThirdPartyAPI({ partyName }),
        onError: (err) => {
            toast.error(err.response.data.detail);
        },
    });
    return { isLoading, loginWithThirdParty };
}