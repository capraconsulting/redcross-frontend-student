import React from 'react';
import { light } from '@material-ui/core/styles/createPalette';


export default function ItemsList(questions) {

  return (
    <div>
      <ul>
        {questions.map(question => {
          return (
            <li key={question.id}>
              {question.question}
              {question.answer}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
