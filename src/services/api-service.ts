import axios from 'axios';
import { API_URL, HEADERS } from '../../config';
import { IQuestion, IGrade, ISubject } from '../interfaces';

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

export function getSubjectList(mestring: string): Promise<ISubject[]> {
  return api
    .get('subjects' + mestring)
    .then(res => res.data)
    .catch(e => console.log('Could not get subject list'));
}

export function getSubjectStatus(id: string) {
  return api
    .get(`timeslots/subject/${id}`)
    .then(res => res.data)
    .catch(e => console.error(e.getMessage));
}

export function postQuestion(question) {
  // Which msgType will this be? Defined in backend
  console.log(question);
  return api
    .post('questions', question)
    .then(res => res.data)
    .catch(e => console.error(e.getMessage));
}

export function postFeedback(questionID, feedbackText) {
  // Which msgType will this be? Defined in backend
  console.log(feedbackText);
  return api
    .post(`feedback/question/${questionID}`, { feedbackText })
    .then(res => res.data)
    .catch(e => console.error(e.getMessage));
}

export function getQuestion(url: string) {
  return api
    .get(url)
    .then(res => res)
    .catch(err => err);
}
