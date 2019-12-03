import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, makeStyles, Avatar, Paper, Chip } from '@material-ui/core';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { useDispatch, useSelector } from 'react-redux';
import UserInput from '../components/UserInput';
import ItemsMenu from '../components/ItemsMenu';
import conf from '../config/config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ls from 'local-storage';

const useStyles = makeStyles(theme => ({
    continue: {
        margin: theme.spacing(3, 0, 2),
        // justifyContent: 'center',
        textAlign:  'center',
      },
    button: {
        // height: '100%',
        width: '100%',
        color: 'white',
        background: "#3f51b5",
        borderRadius: '20px',
        '&:hover': {
            background: "#5e6cb5",
        },
    },
    info: {
        // justifyContent: 'center',
        textAlign:  'center',
        minHeight: '400px',
    },
    banner: {
        background: '#b30000',
        height: '50px',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
    },
    fields: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
        borderColor: 'green',
        borderWidth: 2,
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      chipsContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
      },
      chips: {
        margin: theme.spacing(0.5),
      },
}));

function ProfileSetup(props) {

    // const connected = ls.get('connected');
    const classes = useStyles();

    var connected = useSelector(state => state.user.connected);
    var uuid = useSelector(state => state.user.uuid);
    var username = useSelector(state => state.user.username);

    const [toNext, settoNext] = useState(false);

    const [chipToAdd, setchipToAdd] = useState('')
    const handleDelete = (tagToDelete) => () => {
        console.log(setup.tags.filter( tag => tag !== tagToDelete));
        let newArr = setup.tags.filter( tag => tag !== tagToDelete );
        setSetup({...setup, tags: newArr});
    };
    const handleTagsChange = (event) => {
        setchipToAdd(event.target.value);
    }

    const init = {
        gender: '',
        sexpref: '',
        bio: '',
        tags: [
            '#Tech',
            '#Culture',
            '#Traveling',
            '#BDSM',
            '#ALPHABET',
        ],
        pictures: [],
    }
    const [setup, setSetup] = useState(init);

    const handleTagsAdd = (event) => {
        console.log(setup);
        if (event.key === 'Enter' && typeof chipToAdd === 'string' && chipToAdd[0] === '#' && chipToAdd.length > 1) {
            setup.tags.push(chipToAdd);
            setSetup({...setup, tags: [...setup.tags]});
            setchipToAdd('');
        }
    }
    const handleEventChange = (event) => {
        setSetup({...setup, [event.target.name]:event.target.value});
    }

    const handleErrors = (obj) => {
        setSetup({...setup, ...obj});
    }

    const sendData = async () => {
        try {
            await axios.patch(`/api/${conf.apiVer}/users/${uuid}`, setup);
            settoNext(true);
        }
        catch (e) {
          if (e.response.data.errors) {
            const errors = {
              genderError: e.response.data.errors.genderError,
              sexprefError: e.response.data.errors.sexprefError,
              bioError: e.response.data.errors.bioError,
              tagsError: e.response.data.errors.tagsError,
              picturesError: e.response.data.errors.picturesError,
            }
            handleErrors(errors);
          }
        }
      }
  
      const Submit = (event) => {
        event.preventDefault();
          sendData();
      }

      return (
        <>
      <Container className={ 'card-1'} maxWidth='sm'>
        {/* {connected && <Redirect to="/home"/>} */}
        {toNext && <Redirect to="/users"/>}
            <Grid container spacing={0} className={classes.info}>
                    <Grid item xs={12} className={classes.banner}>
                    
                    </Grid>
                    <Grid item xs={12}>
                        <Avatar>{username.toUpperCase()[0]}</Avatar>
                    </Grid>
                    <Grid item xs={12} >
                        <h4>Tell us more about you.</h4>
                    </Grid>
                    <Grid item xs={12} >
                        <ItemsMenu 
                        itemName={ 'Gender' }
                        name={ 'gender' }
                        items={ ['Male', 'Female'] }
                        val={ setup.gender }
                        func={ handleEventChange }
                        helperText={ setup.genderError }
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <ItemsMenu
                        itemName={ 'Sexual orientation ' }
                        name={ 'sexpref' }
                        items={ ['Heterosexual', 'Homosexual', 'Bisexual'] }
                        val={ setup.sexpref }
                        func={ handleEventChange }
                        helperText={ setup.sexprefError }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <UserInput
                        multiline
                        label={ 'bio' }
                        val={ setup.bio }
                        func={ handleEventChange }
                        helperText={ setup.bioError }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <UserInput
                            label={ 'interests' }
                            val={ chipToAdd }
                            func={ handleTagsChange }
                            funcKey={ handleTagsAdd }
                            helperText={ setup.tagsError }
                        />
                        <span className={classes.chipsContainer}>
                            {setup.tags.map((label, index) =>
                                (<Chip
                                    variant="outlined"
                                    size="small"
                                    key={index}
                                    label={label}
                                    onDelete={handleDelete(label)}
                                    className={classes.chip}
                                />)
                            )}
                        </span>
                    </Grid>
                    <Grid item xs={12} className={classes.continue}>
                        <Button
                            className={classes.button}
                            onClick={ Submit }
                            type="submit"
                            color="primary"
                            >
                            Submit
                        </Button>
                    </Grid>
            </Grid>
      </Container>
      </>
    );
}

export default ProfileSetup;