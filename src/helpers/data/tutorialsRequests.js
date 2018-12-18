import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/tutorials.json`)
    .then((res) => {
      const tutorials = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          tutorials.push(res.data[key]);
        });
      }
      resolve(tutorials);
    })
    .catch(err => reject(err));
});

const deleteTutorial = tutorialId => axios.delete(`${firebaseUrl}/tutorials/${tutorialId}.json`);

export default {
  getRequest,
  deleteTutorial,
};
