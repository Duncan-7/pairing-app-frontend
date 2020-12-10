import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/'
});

//local server url
// baseURL: 'http://localhost:3000/',
// heroku url: 'https://pacific-brook-60350.herokuapp.com/'

export default instance;