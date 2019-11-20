import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
    borderColor: 'green',
      borderWidth: 2,
  }
}));

export default function UserInput(props) {

  const classes = useStyles();

  const type = props.type ? props.type : "";
  const msg = props.helperText ? props.helperText : "";
  // console.log(msg);
  const error = msg ? true : false;
  return (
      <TextField
      className={ classes.textField }
      label={ props.label }
      margin="normal"
      name={ props.label }
      value={ props.val }
      type={ type }
      onChange={ props.func }
      helperText={ msg }
      error={ error }
      />
    );
}
