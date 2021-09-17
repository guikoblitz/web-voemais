import axios from 'axios';

const Api = axios.create({
  // 'baseURL' do Back-End -> fará a comunicação do Front com o Back.
  baseURL: 'http://localhost:3000'
});

export default Api;
