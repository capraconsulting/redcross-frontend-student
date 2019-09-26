import axios from 'axios';
import { API_URL, HEADERS } from '../../config';
import { IQuestion, IGrade, ISubject, IOpen, IVolunteerSubject } from '../interfaces';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? process.env.API_URL : API_URL,
  headers: HEADERS,
});

export function getQuestionList(query): Promise<IQuestion[]> {
  return api.get(`questions/public${query}`).then(res => res.data);
}

export function getGradeList(): Promise<IGrade[]> {
  return api.get('grades').then(res => res.data);
}
export function getSubjectList(mestring: string): Promise<ISubject[]> {
  return api.get('subjects' + mestring).then(res => res.data);
}

export function getSubjectStatus(id: string) {
  return api.get(`timeslots/subject/${id}`).then(res => res.data);
}

export function getActiveSubjects(mestring: string): Promise<IVolunteerSubject[]> {
  return api.get('subjects/active').then(res => res.data);
}

export function postQuestion(question) {
  // Which msgType will this be? Defined in backend
  return api.post('questions', question).then(res => res.data);
}

export function postFeedback(questionID, feedbackText) {
  // Which msgType will this be? Defined in backend
  return api
    .post(`feedback/question/${questionID}`, { feedbackText })
    .then(res => res.data);
}

export function getQuestion(url: string) {
  return api
    .get(url)
    .then(res => res.data)
    .then(res => res);
}

export function getIsLeksehjelpOpen<T>(): Promise<IOpen> {
  return api.get('isopen').then(res => res.data);
}
