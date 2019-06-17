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
import { NorwegianDate } from '../../services/date-pipe-service';

export default function QAList(questions: IQuestion[]) {
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
                    {question.course}, {question.grade},{' '}
                    {NorwegianDate(question.date)}
                  </p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  {/*Question content*/}
                  {question.question}
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
        Fant du ikke det du lette etter? <a href="#">Still et spørsmål</a>
      </div>
    );
  }
}
