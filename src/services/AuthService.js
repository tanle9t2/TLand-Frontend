import axios from "axios";
import { KEYCLOAK_URL } from "../utils/Url";

export async function loginAPI({ usernameOrEmail, password }) {
    try {
        const params = new URLSearchParams();

        params.append("grant_type", "password");
        params.append("client_id", "tland-react");
        params.append("username", usernameOrEmail);
        params.append("password", password);

        const response = await axios.post(
            `${KEYCLOAK_URL}/protocol/openid-connect/token`,
            params,
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        );

        const data = response.data;
        return data
    } catch (err) {
        throw new Error(err.message);
    }
};


export async function loginWithThirdParty({ partyName }) {
    const redirectUrl = encodeURIComponent("http://localhost:5173/");
    const url = `http://localhost:8443/realms/TLand/protocol/openid-connect/auth?client_id=tland-react&response_type=code&scope=openid&redirect_uri=${redirectUrl}&kc_idp_hint=google`;

    window.location.href = url;

};

