import axios from 'axios';
import { API_URL, HEADERS } from '../../config';

const api = axios.create({
  baseURL: API_URL,
  headers: HEADERS,
});

export function get(url: string) {
  return api
    .get(`${url}`)
    .then(res => res)
    .catch(error => error);
}

export function post(url: string, body) {
  return api
    .post(`${url}`, body)
    .then(res => res)
    .catch(error => error);
}

export async function getQuestion(url: string) {
  try {
    return await api.get(`${url}`);
  } catch (error) {
    return error;
  }
}
