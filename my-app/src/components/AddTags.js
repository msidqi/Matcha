import React, { useState } from 'react';
import { Chip } from '@material-ui/core';
import UserInput from './UserInput';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
      chipsContainer: {
        margin: '5px auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        // padding: theme.spacing(0.5),
      },
      chip: {
        margin: '2px',
        // margin: theme.spacing(0.5),
      },
}));

export default function AddTags(props) {

    const classes = useStyles();

    const [chipToAdd, setchipToAdd] = useState('');

    const handleTagsChange = (event) => {
        setchipToAdd(event.target.value);
    };

    const handleTagsAdd = (event) => {
        let withHashTag = chipToAdd[0] === '#' ? chipToAdd : `#${chipToAdd}`;
        if (event.key === 'Enter' && withHashTag.length > 1) {
            if (!setup.tags.includes(withHashTag)) {
                setup.tags.push( withHashTag );
                setSetup({...setup, tags: [...setup.tags]});
            }
            setchipToAdd('');
        }
    }

    return (
    <>
        <UserInput
            label={ 'interests' }
            val={ chipToAdd }
            func={ handleTagsChange }
            funcKey={ props.handleTagsAdd }
            helperText={ props.tagsError }
        />
        <span className={classes.chipsContainer}>
            {props.tags.map((label, index) =>
                (<Chip
                    className={classes.chip}
                    variant="outlined"
                    size="small"
                    key={index}
                    label={label}
                    onDelete={ props.handleTagsDelete(label) }
                />)
            )}
        </span>
    </>
    );
}