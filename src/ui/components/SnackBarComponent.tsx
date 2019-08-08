import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions/transition';

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

interface IProps {
  event;
  content;
  actions?;
}

const DirectionSnackbar = (props: IProps) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { event, content, actions } = props;
  return (
    <Snackbar
      open={event}
      onClose={handleClose}
      TransitionComponent={TransitionLeft}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{content}</span>}
      action={actions}
    />
  );
};

export default DirectionSnackbar;
