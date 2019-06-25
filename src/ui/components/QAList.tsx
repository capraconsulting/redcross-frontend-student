import React from 'react';
import '../../styles/QAList.less';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from 'react-accessible-accordion';
import IQuestion from '../../interfaces/IQuestion';
import { NorwegianDate } from '../../services/date-service';

const QAList = (questions: IQuestion[]) => {
  if (questions && questions.length > 0) {
    /*This array can be null (before we fetch it)*/
    return (
      <Accordion allowZeroExpanded={true}>
        {questions.map(question => {
          return (
            <AccordionItem key={`question-${question.id}`}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {question.title} {/*question title*/}
                  <p>
                    {question.subjectId}, {question.studentGrade},{' '}
                    {NorwegianDate(question.questionDate)}
                  </p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  {/*Question content*/}
                  {question.questionText}
                </p>

                <hr />

                <p>{question.answer}</p>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  } else {
    return (
      <div>
        Fant du ikke det du lette etter?{' '}
        <a href="/questions/new">Still et spørsmål</a>
      </div>
    );
  }
};

export default QAList;
