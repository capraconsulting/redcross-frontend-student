import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions/transition';

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}

interface IProps {
  event;
  content;
  actions?;
}

const DirectionSnackbar = (props: IProps) => {
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const handleClick = (
    Transition: React.ComponentType<TransitionProps>,
  ) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { event, content, actions } = props;
  return (
    <div>
      <Button onClick={handleClick(TransitionLeft)}>Right</Button>
      <Button onClick={handleClick(TransitionUp)}>Up</Button>
      <Button onClick={handleClick(TransitionRight)}>Left</Button>
      <Button onClick={handleClick(TransitionDown)}>Down</Button>
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
    </div>
  );
};

export default DirectionSnackbar;
