import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/resources.json`)
    .then((res) => {
      const resources = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          resources.push(res.data[key]);
        });
      }
      resolve(resources);
    })
    .catch(err => reject(err));
});

const postResource = resource => axios.post(`${firebaseUrl}/resources.json`, resource);

const deleteResource = resourceId => axios.delete(`${firebaseUrl}/resources/${resourceId}.json`);

const putRequest = (resourceId, resource) => axios.put(`${firebaseUrl}/resources/${resourceId}.json`, resource);

export default {
  getRequest,
  postResource,
  deleteResource,
  putRequest,
};
