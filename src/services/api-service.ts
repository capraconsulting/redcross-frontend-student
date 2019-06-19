import axios from 'axios';
import { API_URL, HEADERS } from '../../config';
import { IQuestion, IGrade, ICourse } from '../interfaces/index';

const api = axios.create({
  baseURL: API_URL,
  headers: HEADERS,
});

export function getQuestionList(): Promise<IQuestion[]> {
  return api
    .get('questions')
    .then(res => res.data)
    .catch(e => console.error(e.getMessage));
}

export function getGradeList(): Promise<IGrade[]> {
  return api
    .get('grades')
    .then(res => res.data)
    .catch(e => console.error(e.getMessage));
}

export function getCourseList(): Promise<ICourse[]> {
  return api
    .get('courses')
    .then(res => res.data)
    .catch(e => console.error(e.getMessage));
}

export function postQuestion(question) {
  // Which type will this be? Defined in backend
  return api
    .post('questions', question)
    .then(res => res)
    .catch(e => console.error(e.getMessage));
}

export async function getQuestion(url: string) {
  try {
    return await api.get(`${url}`);
  } catch (error) {
    return error;
  }
}
