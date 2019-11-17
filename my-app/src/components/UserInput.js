import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  }
}));

export default function UserInput(props) {

  const classes = useStyles();

  return (
      <TextField
      id="standard-basic"
      className={ classes.textField }
      label={ props.label }
      margin="normal"
      name={ props.label }
      value={ props.val }
      onChange={ props.func }
      />
    );
}
