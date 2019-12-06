import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, makeStyles, Avatar, Chip } from '@material-ui/core';
import { useSelector } from 'react-redux';
import UserInput from '../components/UserInput';
import ItemsMenu from '../components/ItemsMenu';
import conf from '../config/config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    continue: {
        margin: theme.spacing(3, 0, 2),
        textAlign:  'center',
      },
    button: {
        // height: '100%',
        width: '100%',
        color: 'white',
        background: "#171225",
        borderRadius: '20px',
        '&:hover': {
            background: "#ef4a25",
        },
    },
    upload: {
        margin: '5px auto',
        // width: '100%',
        // borderRadius: '20px',
    },
    info: {
        textAlign:  'center',
        minHeight: '400px',
    },
    card: {
        paddingRight:    '0px',
        paddingLeft:    '0px',
        background: 'white',
        'border-radius': '5px',
        overflow: 'auto',
        'margin-top': '100px',
        'box-shadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    },
    paddingLeftRight: {
        paddingLeft: '32px',
        paddingRight: '32px',
    },
    banner: {
        background: '#ef4a25',
        height: '10px',
    },
    fields: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
        borderColor: 'green',
        borderWidth: 2,
      },
      chipsContainer: {
        // margin: '5px auto',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
      },
      chips: {
        margin: theme.spacing(0.5),
      },
      margincenter: {
        margin: '5px auto',
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
        // console.log(setup.tags.filter( tag => tag !== tagToDelete));
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
        console.log(document.getElementById('imageInput').files);
        let withHashTag = chipToAdd[0] === '#' ? chipToAdd : `#${chipToAdd}`;
        if (event.key === 'Enter' && withHashTag.length > 1) {
            if (!setup.tags.includes(withHashTag)) {
                setup.tags.push( withHashTag );
                setSetup({...setup, tags: [...setup.tags]});
            }
            setchipToAdd('');
        }
        // console.log(setup);
    }

    const handleEventChange = (event) => {
        setSetup({...setup, [event.target.name]:event.target.value});
    }

    const handleErrors = (obj) => {
        setSetup({...setup, ...obj});
    }
  
      const Submit = (event) => {
        event.preventDefault();
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
          sendData();
      }

      return (
    <>
    {toNext && <Redirect to="/users"/>}
    {/* {connected && <Redirect to="/home"/>} */}
        <Container className={ classes.card } maxWidth='sm'>
            <Grid item xs={12} className={classes.banner}>
            </Grid>
            <Grid container spacing={0} className={`${classes.paddingLeftRight} ${classes.info}`}>
                    
                    <Grid item xs={12} >
                        <Avatar className={classes.margincenter} variant="rounded">{username.toUpperCase()[0]}</Avatar>
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
                    <Grid item xs={12}>
                        <form method="patch" encType="multipart/form-data">
                            <input className={classes.upload} id="imageInput" type="file" name="photos" multiple/>
                        </form>
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