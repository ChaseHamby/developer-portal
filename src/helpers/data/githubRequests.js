
import axios from 'axios';

// const clientId = apiKeys.githubApi.client_id;
// const clientSecret = apiKeys.githubApi.client_secret;

const getUser = token => new Promise((resolve, reject) => {
  axios.get('https://api.github.com/user', { headers: { Authorization: `token ${token}` } })
    .then((res) => {
      const profile = res.data;
      resolve(profile);
    })
    .catch((err) => {
      reject(err);
    });
});

const getUserEvents = (userName, token) => new Promise((resolve, reject) => {
  axios.get(`https://api.github.com/users/${userName}/events/public`, { headers: { Authorization: `token ${token}` } })
    .then((res) => {
      let commitCount = 0;
      const pushEvents = res.data.filter(event => event.type === 'PushEvent');
      pushEvents.forEach((pushEvent) => {
        commitCount += pushEvent.payload.commits.length;
      });
      resolve(commitCount);
    })
    .catch((err) => {
      reject(err);
    });
});

export default {
  getUser,
  getUserEvents,
};
