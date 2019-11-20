import React from 'react';
import { makeStyles } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import '../components/BirthDate.css';


const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
    borderColor: 'green',
    borderWidth: 2,
    },
}));

export default function BirthDate(props) {

  const classes = useStyles();

  const msg = props.helperText ? props.helperText : "";
  const error = msg ? true : false;
  return (
        <MuiPickersUtilsProvider utils={ DateFnsUtils }>
            <KeyboardDatePicker
            className={ classes.textField }
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label="Birth date"
            value={ props.val }
            onChange={ props.func }
            KeyboardButtonProps={{ 'aria-label': 'change date' }}
            helperText={ msg }
            error={ error }
            />
        </MuiPickersUtilsProvider>
    );
}
