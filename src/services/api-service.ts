import axios from 'axios';
import { API_URL, HEADERS } from '../../config';
import { IQuestion, IGrade, ISubject, IStatus } from '../interfaces/index';

const api = axios.create({
  baseURL: API_URL,
  headers: HEADERS,
});

export function getQuestionList(query): Promise<IQuestion[]> {
  return api
    .get(`questions/public${query}`)
    .then(res => res.data)
    .catch(e => console.log('Could not get question list'));
}

export function getGradeList(): Promise<IGrade[]> {
  return api
    .get('grades')
    .then(res => res.data)
    .catch(e => console.log('Could not get grade list'));
}

export function getSubjectList(): Promise<ISubject[]> {
  return api
    .get('subjects')
    .then(res => res.data)
    .catch(e => console.log('Could not get subject list'));
}

export function getSubjectStatus(id: string): Promise<IStatus[]> {
  return api
    .get(`subject/status/${id}`)
    .then(res => res.data.status)
    .catch(e => console.error(e.getMessage));
}

export function postQuestion(question) {
  // Which type will this be? Defined in backend
  return api
    .post('questions', question)
    .then(res => res.data)
    .catch(e => console.error(e.getMessage));
}

export function getQuestion(url: string) {
  return api
    .get(url)
    .then(res => res)
    .catch(err => err);
}
