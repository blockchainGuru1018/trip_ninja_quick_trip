import axios from 'axios';

let endpoint: any;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  endpoint = axios.create({
    baseURL: 'http://127.0.0.2:8000/api/v1/'
  });
} else if (window.location.origin.includes('quicktrip-dev')) {
  endpoint = axios.create({
    baseURL: 'https://auth-server-dev.us-east-1.elasticbeanstalk.com/api/v1/'
  });
} else if (window.location.origin.includes('app.tripninja.io')) {
  endpoint = axios.create({
    baseURL: 'https://tn-auth-server-prod.us-west-2.elasticbeanstalk.com/api/v1/'
  });
}

endpoint.interceptors.request.use((config: any) => {
  const token: string = localStorage.getItem('token') || '';
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export default endpoint;