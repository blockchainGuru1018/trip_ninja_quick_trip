import axios from 'axios';

let endpoint: any;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  endpoint = axios.create({
    baseURL: 'http://127.0.0.2:8000/api/v1/'
  });
} else if (window.location.origin.includes('quicktrip-dev')) {
  endpoint = axios.create({
    baseURL: 'https://quicktrip-dev-1.us-east-1.elasticbeanstalk.com/api/v1/'
  });
} else if (window.location.origin.includes('app.tripninja.io')) {
  endpoint = axios.create({
    baseURL: 'https://quicktrip.us-west-2.elasticbeanstalk.com/api/v1/'
  })
}

endpoint.interceptors.request.use((config: any) => {
  const token: string = localStorage.getItem('token') || '';
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export default endpoint;