export const authConfig = {
    clientId: 'tland-react',
    authorizationEndpoint: "http://localhost:8443/realms/TLand/protocol/openid-connect/auth",
    tokenEndpoint: "http://localhost:8443/realms/TLand/protocol/openid-connect/token",
    redirectUri: 'http://localhost:5173/',
    scope: 'openid email profile offline_access',
    onRefreshTokenExpire: (event) => event.logIn(),
}