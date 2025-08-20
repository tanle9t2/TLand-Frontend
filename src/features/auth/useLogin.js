import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../services/AuthService";
import { setLocalStorageRefreshToken, setLocalStorageToken } from "../../utils/helper";
import toast from "react-hot-toast";

export default function useLogin() {
    const navigate = useNavigate();
    const { isLoading, mutate: defaultLogin } = useMutation({
        mutationFn: ({ usernameOrEmail, password }) =>
            loginAPI({ usernameOrEmail, password }),
        onSuccess: (token) => {
            const { access_token, refresh_token } = token
            setLocalStorageToken(access_token);
            setLocalStorageRefreshToken(refresh_token);
            navigate("/");
        },
        onError: (err) => {
            toast.error(err.response.data.detail);
        },
    });
    return { isLoading, defaultLogin };
}