const getIsAuthenticated = (state) => state.auth.isAuthenticated;
const getToken = (state) => state.auth.token;

export { getIsAuthenticated, getToken };
