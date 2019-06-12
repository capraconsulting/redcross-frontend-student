import axios from 'axios';
import IQuestion from '../interfaces/IQuestion';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

export function get(url: string) {
  return api.get(`${url}`).then(res => res).catch(error => error);
}

export function post(url: string, body) {
  return api.post(`${url}`, body).then(res => res).catch(error => error);
}


