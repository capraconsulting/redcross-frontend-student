import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

const GreenCheckbox = withStyles({
  root: {
    color: '#82c289',
    '&$checked': {
      color: '#82c289',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface IProps {
  label: string;
  value: boolean;
}

export default function CheckboxComponent(props: IProps) {
  const { label, value } = props;

  return (
    <FormControlLabel
      control={<GreenCheckbox checked={value} value={value} />}
      label={label}
    />
  );
}
