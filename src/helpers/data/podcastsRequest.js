import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/podcasts.json`)
    .then((res) => {
      const podcasts = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          podcasts.push(res.data[key]);
        });
      }
      resolve(podcasts);
    })
    .catch(err => reject(err));
});

const postPodcast = podcast => axios.post(`${firebaseUrl}/podcasts.json`, podcast);

const deletePodcast = podcastId => axios.delete(`${firebaseUrl}/podcasts/${podcastId}.json`);

const putRequest = (podcastId, podcast) => axios.put(`${firebaseUrl}/podcasts/${podcastId}.json`, podcast);

export default {
  getRequest,
  postPodcast,
  deletePodcast,
  putRequest,
};
