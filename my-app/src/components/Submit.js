import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
      },
}));

export default function Submit(props) {

  const classes = useStyles();

  return (
    <Button 
    type="submit"
    color="primary"
    className={classes.submit}
    >
      { props.val }
    </Button>
    );
}
