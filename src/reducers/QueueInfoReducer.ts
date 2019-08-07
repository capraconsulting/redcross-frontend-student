import { createAction, createReducer } from 'typesafe-actions';
import { IAction, IQueueMessage } from '../interfaces';

export const setIntroTextAction = createAction('INTRO_TEXT', callback => {
  return (introText: string) => callback({ introText });
});

export const initStudentInfoAction = createAction('INIT', callback => {
  return (info: IQueueMessage) => callback({ info });
});

export const addThemeAction = createAction('ADD_THEME', callback => {
  return (theme: string) => callback({ theme });
});

export const removeThemeAction = createAction('REMOVE_THEME', callback => {
  return (theme: string) => callback({ theme });
});

export const cleanStudentInfoAction = createAction('CLEAN', callback => {
  return () => callback({});
});

const handleSetIntroText = (state: IQueueMessage, action: IAction) => {
  state.introText = action.payload.introText;
  return { ...state };
};

const handleInitStudentInfo = (state: IQueueMessage, action: IAction) => {
  return action.payload.info;
};

const handleAddTheme = (state: IQueueMessage, action: IAction) => {
  if (!state.themes) {
    state.themes = [];
  }
  if (state.themes.includes(action.payload.theme)) {
    return state;
  }
  state.themes.push(action.payload.theme);
  return { ...state };
};

const handleRemoveTheme = (state: IQueueMessage, action: IAction) => {
  return {
    ...state,
    themes: state.themes.filter(theme => theme !== action.payload.theme),
  };
};

const handleCleanStudentInfo = (state: IQueueMessage, action: IAction) => {
  return {} as IQueueMessage;
};

export const queueInfoReducer = createReducer<IQueueMessage, IAction>(
  {} as IQueueMessage,
)
  .handleAction(initStudentInfoAction, handleInitStudentInfo)
  .handleAction(setIntroTextAction, handleSetIntroText)
  .handleAction(addThemeAction, handleAddTheme)
  .handleAction(removeThemeAction, handleRemoveTheme)
  .handleAction(cleanStudentInfoAction, handleCleanStudentInfo);
