import createStore from "react-auth-kit/createStore";
import refresh from "./RefreshToken";

const store = createStore({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'http:',
    refresh: refresh,
});
  
export default store;
