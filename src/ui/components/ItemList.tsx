import React from 'react';
import '../../styles/QAList.css';
import {Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton} from 'react-accessible-accordion';

export default function ItemList(questions) {
  return (
    <Accordion allowZeroExpanded={true}>
      {questions.map(question => {
        return (
          <AccordionItem key={`question-${question.id}`}>
            <AccordionItemHeading>
              <AccordionItemButton>
                {question.question} {/*question title*/}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>
                {/*Question content*/}
                Kommer: question content
              </p>
            </AccordionItemPanel>
            <AccordionItemPanel>
              <p>
                {question.answer}
              </p>
            </AccordionItemPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

/*export default function ItemsList(questions, open, isOpen) {

  return (
    <div className={'qa_items'}>
      <ul>
        {questions.map(question => {
          console.log(isOpen);
          return (
            <li key={question.id}>
              <a href="#" onClick={() => open(question.id)}>
                <div>{question.question}</div>
                <div className={'meta'}>
                  {question.course}, {question.class}, {question.date}
                </div>
              </a>
              <div className={isOpen === question.id ? 'open' : 'closed'}>
                <div className={'text-component'}>
                  {question.answer}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}*/
