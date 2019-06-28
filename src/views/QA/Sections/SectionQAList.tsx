import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from 'react-accessible-accordion';

//Styles
import '../../../styles/QAList.less';

//Interfaces
import { IQuestion } from '../../../interfaces';

//Services
import { NorwegianDate } from '../../../services/date-service';

const SectionQAList = (questions: IQuestion[], totalHits: number) => {
  /*This array can be null (before we fetch it)*/
  return questions && questions.length > 0 ? (
    <div>
      <div className="resultStatus">Søket ditt ga {totalHits} svar</div>
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
              <div className="underline"></div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  ) : (
    <div className="resultStatus">Søket ditt ga ingen svar</div>
  );
};

export default SectionQAList;
