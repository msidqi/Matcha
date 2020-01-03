import React, { useState } from 'react';
import { Container, Grid, Button, makeStyles, Avatar, Chip } from '@material-ui/core';
// import { useSelector } from 'react-redux';
import UserInput from '../components/UserInput';
import ItemsMenu from '../components/ItemsMenu';
import conf from '../config/config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import UserState from '../components/UserState';
import { useDispatch } from 'react-redux';
import { saveUser } from '../reduxx/actions/save';
import ls from 'local-storage';
import getPosition from '../helpers/getPosition';
// import AddTags from '../components/AddTags';
// import FileInput from '../components/FileInput';
// CREATE CONSTRAINT ON (t:tag) ASSERT t.name IS UNIQUE;

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
        // background: 'red',
        width: '100%',
        // borderRadius: '20px',
    },
    info: theme.info,
    card: theme.card,
    heightAuto: theme.heightAuto,
    paddingLeftRight: theme.paddingLeftRight,
    banner: theme.banner,
    fields: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
        borderColor: 'green',
        borderWidth: 2,
      },
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
      margincenter: theme.margincenter,
      image: {
          width: '100%',
          background: 'black',
          height: '100%',
      },
}));

function ProfileSetup(props) {

    const classes = useStyles();

    const user = UserState();
    const dispatch = useDispatch();

    const [toNext, settoNext] = useState(false);

    const [chipToAdd, setchipToAdd] = useState('');

    const handleTagsDelete = (tagToDelete) => () => {
        let newArr = setup.tags.filter( tag => tag !== tagToDelete );
        setSetup({...setup, tags: newArr});
    }

    const handleTagsChange = (event) => {
        setchipToAdd(event.target.value);
    }

    const init = {
        gender: '',
        sexpref: '',
        bio: '',
        tags: [ '#Tech', '#Culture', '#Ugly-Bastard', '#BDSM', '#ALPHABET', '#BigKnees' ],
        pictures: [],
        picIndex: -1,
    }

    const [setup, setSetup] = useState(init);

    const handleTagsAdd = (event) => {
        console.log('here');
        let withHashTag = chipToAdd[0] === '#' ? chipToAdd : `#${chipToAdd}`;
        if (event.key === 'Enter' && withHashTag.length > 1) {
            if (!setup.tags.includes(withHashTag)) {
                setup.tags.push( withHashTag );
                setSetup({...setup, tags: [...setup.tags]});
            }
            setchipToAdd('');
        }
    }

    const handleEventChange = (event) => {
        setSetup({...setup, [event.target.name]:event.target.value});
    }

    const handleInputChange = () => {
        if (typeof document.getElementById('pictures').files[0] == 'undefined')
            return ;
        let reader = new FileReader();
        reader.readAsDataURL(document.getElementById('pictures').files[0]);
        reader.onload = (event) => {
            if(event.target.readyState === FileReader.DONE) {
                let img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    let avatarPic = document.getElementById('Avatar').getElementsByTagName('img')[0];
                    avatarPic.src = img.src;
                };
            };
        }
        setSetup({...setup, pictures: [...document.getElementById('pictures').files], picIndex: 0});
    }

    const Submit = (event) => {
        event.preventDefault();
            (async function sendData () {
            try {
                let formData = new FormData();
                formData.append('gender', setup.gender);
                formData.append('sexpref', setup.sexpref);
                formData.append('bio', setup.bio);
                formData.append('picIndex', setup.picIndex);
                let pos = (await getPosition()).coords;
                formData.append('position', pos.longitude);
                formData.append('position', pos.latitude);
                for (let i = 0; i < setup.tags.length; i++) {
                    formData.append('tags', setup.tags[i]);
                }
                let pictures = document.getElementById('pictures');
                for (const key in pictures.files) {
                    if (pictures.files.hasOwnProperty(key)) {
                        formData.append('pictures', pictures.files[key]);
                    }
                }
                await axios.put(`/api/${conf.apiVer}/users/${user.uuid}`, formData);
                ls.set('completed', true);
                dispatch(saveUser({...user, completed: true}));
                settoNext(true);
            }
            catch (e) {
                console.log(e.response);
                if (e.response.data.errors) {
                    let errors = {};
                    if (e.response.status === 415)
                        e.response.data.errors.picturesError = e.response.data.error;
                    for (const key in setup) {
                        if (key !== 'picIndex' && e.response.data.errors[`${key}Error`])
                            errors[`${key}Error`] = e.response.data.errors[`${key}Error`];
                    }
                    setSetup({...setup, ...errors});
                }
                else
                {
                    let errors = {};
                    for (const key in setup) {
                        errors[`${key}Error`] = '';
                        setSetup({...setup, ...errors});
                    }
                }
            }
        })()
    }

    const changeAvatarPic = (event, img, startIndex) => {
        let avatarPic = document.getElementById('Avatar').getElementsByTagName('img')[0];
        let index = event ? event.target.name : startIndex;
        avatarPic.src = event ? event.target.src : img.src;
        setSetup({...setup, picIndex: index});
    }

    return (
    <>
    {toNext && <Redirect to="/home"/>}
        <Container className={ classes.card } maxWidth='sm'>
            <Grid item xs={12} className={classes.banner}>
            </Grid>
            <Grid container spacing={0} className={`${classes.paddingLeftRight} ${classes.info} ${classes.heightAuto}`}>
                    <Grid item xs={12} >
                        <Avatar className={classes.margincenter} id="Avatar" alt="Profile pic" src="https://ssl.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png" />
                        {/* <Avatar id="Avatar" className={classes.margincenter} variant="rounded">{username.toUpperCase()[0]}</Avatar> */}
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
                        itemName={ 'Preference' }
                        name={ 'sexpref' }
                        items={ ['Males', 'Females', 'Both'] }
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
                                    className={classes.chip}
                                    variant="outlined"
                                    size="small"
                                    key={index}
                                    label={label}
                                    onDelete={ handleTagsDelete(label) }
                                />)
                            )}
                        </span>
                    </Grid>
                    <Grid item xs={12}>
                            <div>
                                <label className={classes.upload}>
                                    Click to select your photos...
                                    <input
                                        onChange={ handleInputChange }
                                        style={{ display: "none" }}
                                        id="pictures" type="file" name="pictures" multiple
                                    />
                                </label>
                                <p style={{color: 'red'}}>{ setup.picturesError }</p>
                            </div>
                    </Grid>
                    {setup.pictures.map( (file, index) => {
                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = (event) => {
                            if( event.target.readyState === FileReader.DONE) {
                                let img = new Image();
                                img.src = event.target.result;
                                img.onload = () => {
                                    let myImage = document.getElementById(`myImage-${index}`);
                                    if (myImage)
                                        myImage.src = img.src;
                                };
                            };
                        }
                        return (<Grid item xs={6} key={index}>
                        <img className={classes.image} id={`myImage-${index}`} alt="preview image" name={index} src="" onClick={ changeAvatarPic }/>
                        </Grid>);
                    })}
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