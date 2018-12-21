import axios from 'axios';
import apiKeys from '../apiKeys';

const githubApiUrl = apiKeys.githubApi.apiUrl;

const getUser = (userName, accessToken) => new Promise((resolve, reject) => {
  axios.get(`${githubApiUrl}/user`, { headers: { Authorization: `token ${accessToken}` } })
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

export default { getUser };
