import { mocked } from 'ts-jest/utils';
import axios from 'axios';
import {
  getQuestion,
  getQuestionList,
  getSubjectList,
} from '../services/api-service';

beforeAll(() => {
  mocked(axios.create().post).mockReset();
});

describe('api-service', () => {
  it('TEST: getQuestion \n Should return question with id=1', async () => {
    const question = await getQuestion('questions/1');
    expect(question.data.id).toEqual(1);
  });

  it('TEST: getSubjectList \n Should return list of subjects', async () => {
    const subjectList = await getSubjectList();
    expect(subjectList.length).toBeGreaterThanOrEqual(1);
  });

  it('TEST: getQuestionList \n Should return list of questions', async () => {
    const questionList = await getQuestionList('');
    expect(questionList.length).toBeGreaterThanOrEqual(1);
  });
});
