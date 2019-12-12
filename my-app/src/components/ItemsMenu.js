import React from 'react';
import { Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    fields: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
    borderColor: 'green',
    borderWidth: 2,
    minWidth: 120,
    },
}));

export default function UserInput(props) {

  const classes = useStyles();

  const msg = props.helperText ? props.helperText : "";
  // console.log(msg);
  const error = msg ? true : false;
  return (
    <FormControl className={classes.fields} error={ error }>
        <InputLabel required={props.required} id="demo-simple-select-helper-label">{ props.itemName }</InputLabel>
        <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={ props.val }
        onChange={ props.func }
        name={ props.name }
        >
            { props.items.map(item => <MenuItem key={ item } value={item}>{item}</MenuItem>) }
        </Select>
        <FormHelperText>{ msg }</FormHelperText>
    </FormControl>
    );
}
