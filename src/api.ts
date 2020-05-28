import axios from 'axios';

let endpoint: any
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  endpoint = axios.create({
    baseURL: 'http://127.0.0.2:8000'
  });
} else {
  endpoint = axios.create({
    baseURL: ''
  });
}

export default endpoint;