import axios from "axios";

export const API_SERVER = 'http://127.0.0.2:8000';

axios.defaults.baseURL = API_SERVER;
axios.interceptors.request.use(function (config) {
  const token: string = localStorage.getItem('token') || '';
  config.headers.Authorization =  token ? `Bearer ${token}` : '';

  return config;
});

export { axios };

export const validateEmail = (email: string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
