import { useLocation } from "react-router-dom";
import { authConfig } from "../../utils/authConfig";
import { AuthProvider } from "react-oauth2-code-pkce";
import FullPageSpinner from "../../ui/FullPageSpinner";

function AuthWrapper({ children }) {
    const location = useLocation();
    const publicRoutes = ['/', '/search', '/post/:postId', '/auth/login', '/auth/register'];

    const isOAuthCallback = location.search.includes('code=');

    // Always let AuthProvider handle OAuth callbacks
    if (isOAuthCallback) {
        return (
            <AuthProvider authConfig={authConfig} loadingComponent={<FullPageSpinner />}>
                {children}
            </AuthProvider>
        );
    }

    if (publicRoutes.includes(location.pathname)) {
        return children;
    }

    return (
        <AuthProvider authConfig={authConfig} loadingComponent={<FullPageSpinner />}>
            {children}
        </AuthProvider>
    );
}

export default AuthWrapper
