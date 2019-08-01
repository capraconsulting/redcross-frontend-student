import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4,
    },
  }),
);
interface IProps {
  placeholder: string;
  onChange;
  onClick;
  button;
  defaultValue?: string;
}

export default function CustomizedInputBase(props: IProps) {
  const classes = useStyles();
  const { placeholder, onChange, onClick, button, defaultValue } = props;

  return (
    <Paper className={classes.root}>
      <InputBase
        onChange={event => onChange(event.target.value)}
        onKeyDown={event => event.keyCode === 13 && onClick(true)}
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ 'aria-label': placeholder }}
        defaultValue={defaultValue || ''}
      />
      {button}
    </Paper>
  );
}
