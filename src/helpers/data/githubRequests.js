
import axios from 'axios';

// const clientId = apiKeys.githubApi.client_id;
// const clientSecret = apiKeys.githubApi.client_secret;

const getUser = user => new Promise((resolve, reject) => {
  axios.get('https://api.github.com/users/ChaseHamby')
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export default getUser;
