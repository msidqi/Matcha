import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: '0px',
    // marginBottom: '0px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
    borderWidth: 2,
  }
}));

export default function UserInput(props) {

  const classes = useStyles();

  const type = props.type ? props.type : "";
  const msg = props.helperText ? props.helperText : "";
  // console.log(props.multiline);
  const error = msg ? true : false;
  return (
      <TextField
      multiline={ props.multiline }
      className={ classes.textField }
      label={ props.label }
      margin="normal"
      name={ props.label }
      value={ props.val }
      type={ type }
      onChange={ props.func }
      onKeyDown={ props.funcKey }
      helperText={ msg }
      error={ error }
      />
    );
}
