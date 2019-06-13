import React from 'react';
import '../../styles/QAList.css';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from 'react-accessible-accordion';
import IQuestion from '../../interfaces/IQuestion';

export default function ItemList(questions: IQuestion[]) {
  if (questions.length > 0) {
    return (
      <Accordion allowZeroExpanded={true}>
        {questions.map(question => {
          return (
            <AccordionItem key={`question-${question.id}`}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {question.title} {/*question title*/}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>
                  {/*Question content*/}
                  {question.question}
                </p>

                <hr/>

                <p>
                  {question.answer}
                </p>
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
