import axios from 'axios';

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await axios.post('http://localhost:5000/api/auth/refresh-token', {
      refreshToken,
    });

  
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    return response.data.accessToken;
  } catch (err) {
    throw new Error('Failed to refresh token');
  }
};

export default refreshAccessToken; 