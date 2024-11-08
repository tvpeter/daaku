import axios from 'axios';
import createRefresh from 'react-auth-kit/createRefresh';

const refresh = createRefresh({
    interval: 10, // The time in seconds to refresh the Access token
    refreshApiCallback: async (refreshToken) => {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/auth/refresh',
          refreshToken , 
          { withCredentials: true }
        );
  
        console.log("Refreshing");
        return {
          isSuccess: true,
          newAuthToken: response.data.result.accessToken as string,
          newRefreshToken: response.data.result.refreshToken as string,
          newAuthTokenExpireIn: 3600000,
          newRefreshTokenExpiresIn: 604800000,
        };
      } catch (error) {
        console.error(error);
        return {
          isSuccess: false,
          newAuthToken: undefined,
          newRefreshToken: undefined,
          newAuthTokenExpireIn: undefined,
          newRefreshTokenExpiresIn: undefined,
        };
      }
    },
  });
  
  

  export default refresh;
