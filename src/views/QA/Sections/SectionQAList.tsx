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
import { IQuestion, IFile } from '../../../interfaces';

//Services
import { NorwegianDate } from '../../../services/date-service';

interface IProps {
  questions: IQuestion[];
  totalHits: number;
  history;
}

export const SectionQAList = (props: IProps) => {
  /*This array can be null (before we fetch it)*/
  const { questions, totalHits, history } = props;

  //Temporary to render upcoming feature
  const themeList = [
    {
      themeName: 'Analyse',
    },
    {
      themeName: 'Definisjon',
    },
  ];
  return questions && questions.length > 0 ? (
    <div>
      <div className="resultStatus">Søket ditt ga {totalHits} svar</div>
      <Accordion allowZeroExpanded={true}>
        {questions.map(question => {
          return (
            <AccordionItem key={`question-${question.id}`}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <a className="qa-list-header">{question.title} </a>
                  {/*question title*/}
                  <div className="subject--list">
                    {themeList.map(({ themeName }, index) => (
                      <div
                        key={index}
                        className="subject--list-element subject--list-element-right"
                      >
                        <p>{themeName}</p>
                      </div>
                    ))}
                  </div>
                  <p>
                    {question.subject}, {question.studentGrade},{' '}
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

                <p>{question.answerText}</p>
                <p
                  onClick={() =>
                    history.push(`/questions/public/${question.id}`)
                  }
                  className="plink"
                >
                  Les mer...
                </p>
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
