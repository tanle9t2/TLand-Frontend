import { createContext, useState, useEffect, useContext } from "react";
import keycloak from "../utils/keycloak";
import FullPageSpinner from "../ui/FullPageSpinner";

import { setLocalStorageRefreshToken, setLocalStorageToken } from "../utils/helper";


const AuthContext = createContext();

function AuthProvider({ children }) {
    const [initialized, setInitialized] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    console.log(initialized)
    useEffect(() => {
        keycloak
            .init({
                onLoad: "check-sso",
                silentCheckSsoRedirectUri:
                    window.location.origin + "/silent-check-sso.html"
            })
            .then((auth) => {
                if (auth) {
                    setLocalStorageToken(keycloak.token)
                    setLocalStorageRefreshToken(keycloak.refreshToken)
                }
                setAuthenticated(auth);
                setInitialized(true);
            });
    }, []);

    console.log("op")

    return (
        <AuthContext.Provider
            value={{
                keycloak,
                authenticated,
                initialized,
                login: () => keycloak.login(),
                logout: () => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    keycloak.logout();
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("AuthContext was used outside AuthProvider");
    return context;
}

export { AuthProvider, useAuth };
