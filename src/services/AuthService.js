import axios from "axios";
import { KEYCLOAK_TOKEN_ENDPOINT, KEYCLOAK_URL } from "../utils/Url";
import { getRefreshToken } from "../utils/helper";

export async function refreshToken() {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", "tland-react");
    params.append("refresh_token", getRefreshToken());

    const res = await axios.post(
        KEYCLOAK_TOKEN_ENDPOINT,
        params,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (res.status != 200) throw new Error("Error fetching");
    return res.data;
}

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
    const url = `http://localhost:8443/realms/TLand/protocol/openid-connect/auth?client_id=tland-react&response_type=code&scope=openid&redirect_uri=${redirectUrl}&kc_idp_hint=${[partyName]}`;
    window.location.href = url;
};

