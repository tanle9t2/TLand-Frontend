import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { } from "../../utils/helper";
import toast from "react-hot-toast";
import { signUp as signUpAPI } from "../../services/UserService";
import { useAuth } from "../../context/AuthContext";

export default function useSignUp() {
    const navigate = useNavigate();
    const { login } = useAuth()
    const { isLoading, mutate: signUp } = useMutation({
        mutationFn: ({ username, lastName, firstName, email, password }) =>
            signUpAPI({ username, lastName, firstName, email, password }),
        onSuccess: () => {
            login()
        },
        onError: (err) => {
            toast.error(err.response.data.detail);
        },
    });
    return { isLoading, signUp };
}