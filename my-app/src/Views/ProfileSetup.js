import React, { useState } from 'react';
import { Container, Grid, Button, makeStyles, Avatar, Chip, Input } from '@material-ui/core';
// import { useSelector } from 'react-redux';
import UserInput from '../components/UserInput';
import ItemsMenu from '../components/ItemsMenu';
import conf from '../config/config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import UserState from '../components/UserState';
// import FileInput from '../components/FileInput';

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
      margincenter: {
        margin: '5px auto',
      },
}));

function ProfileSetup(props) {

    const classes = useStyles();

    const {uuid, username} = UserState();

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
            '#BigKnees',
        ],
        pictures: [],
    }
    const [setup, setSetup] = useState(init);

    const handleTagsAdd = (event) => {
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
                let formData = new FormData();
                formData.append('gender', setup.gender);
                formData.append('sexpref', setup.sexpref);
                formData.append('bio', setup.bio);
                for (let i = 0; i < setup.tags.length; i++) {
                    formData.append('tags', setup.tags[i]);
                }
                let pictures = document.getElementById('pictures');
                console.log(pictures.files);
                for (const key in pictures.files) {
                    if (pictures.files.hasOwnProperty(key)) {
                        formData.append('pictures', pictures.files[key]);
                    }
                }
                console.log(formData);
                await axios.put(`/api/${conf.apiVer}/users/${uuid}`, formData);
                settoNext(true);
            }
            catch (e) {
              console.log(e.response.data.errors);
              if (e.response.data.errors) {
                const errors = {
                  genderError: (e.response.data.errors.genderError ? e.response.data.errors.genderError : e.response.data.errors.gender),
                  sexprefError: (e.response.data.errors.sexprefError ? e.response.data.errors.sexprefError : e.response.data.errors.sexpref),
                  bioError: (e.response.data.errors.bioError ? e.response.data.errors.bioError : e.response.data.errors.bio),
                  tagsError: (e.response.data.errors.tagsError ? e.response.data.errors.tagsError : e.response.data.errors.tags),
                  picturesError: (e.response.data.errors.picturesError ? e.response.data.errors.picturesError : e.response.data.errors.pictures),
                }
                handleErrors(errors);
              }
            }
          }
          sendData();
      }

    const changeAvatarPic = (event, img) => {
        let avatarPic = document.getElementById('Avatar').getElementsByTagName('img')[0];
        if (event)
            avatarPic.src = event.target.toDataURL();
        else
            avatarPic.src = img.src;
    }

    function previewImages(e) {
        let files = e.target.files;
        for (let key = 0; (key < 5 && key < files.length); key++) {
            let canvas = document.getElementById(`myCanvas-${key}`);
            let file = files[key];
            if(file && file.type.match('image.*')) {
                canvas.hidden = false;
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (event) => {
                    if( event.target.readyState == FileReader.DONE) {
                        let img = new Image();
                        img.src = event.target.result;
                        img.onload = () => {
                            if (key === 0)
                                changeAvatarPic(null, img);
                            // console.log(img.width, img.height, canvas.height, img.width * (canvas.height / img.height), canvas.height / img.height);
                            let context = canvas.getContext("2d");
                            if (img.width > img.height)
                                context.drawImage(img, 0, 0, canvas.width, img.height * (canvas.height / img.height));
                            else
                                context.drawImage(img, 0, 0, img.width * (canvas.width / img.width), canvas.width);
                        };
                    }
                }
            } else {
                alert("not an image");
                break ;
            }
        }
        for (let i = 4; i >= files.length; i--) {
            document.getElementById(`myCanvas-${i}`).hidden = true;
        }
    }

    return (
    <>
    {toNext && <Redirect to="/users"/>}
        <Container className={ classes.card } maxWidth='sm'>
            <Grid item xs={12} className={classes.banner}>
            </Grid>
            <Grid container spacing={0} className={`${classes.paddingLeftRight} ${classes.info}`}>
                    
                    <Grid item xs={12} >
                        <Avatar className={classes.margincenter} id="Avatar" alt="Remy Sharp" src="https://ssl.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png" />
                        {/* <Avatar id="Avatar" className={classes.margincenter} variant="rounded">{username.toUpperCase()[0]}</Avatar> */}
                    </Grid>
                    <Grid item xs={12} >
                        <h4>Tell us more about you.</h4>
                    </Grid>
                    <Grid item xs={12} >
                        <ItemsMenu 
                        itemName={ 'Gender' }
                        name={ 'gender' }
                        items={ ['Male', 'Femalee'] }
                        val={ setup.gender }
                        func={ handleEventChange }
                        helperText={ setup.genderError }
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <ItemsMenu
                        itemName={ 'Sexual orientation ' }
                        name={ 'sexpref' }
                        items={ ['Heterosexual', 'HomosexualL', 'Bisexual'] }
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
                                    onDelete={handleDelete(label)}
                                />)
                            )}
                        </span>
                    </Grid>
                    <Grid item xs={12}>
                            {/* <label className={classes.upload}>
                                Click to select your photos...
                                <Input 
                                style={{ width: '100%' }}
                                id="pictures" type="file" name="pictures" multiple
                                />
                            </label> */}
                            <div>
                                <label className={classes.upload}>
                                    Click to select your photos...{ setup.picturesError }
                                    <input
                                        onChange={ previewImages }
                                        style={{ display: "none" }}
                                        id="pictures" type="file" name="pictures" multiple  
                                    />
                                </label>
                            </div>
                    </Grid>
                    <Grid item xs={6}>
                        <canvas id="myCanvas-0" hidden onClick={ changeAvatarPic }></canvas>
                    </Grid>
                    <Grid item xs={6}>
                        <canvas id="myCanvas-1" hidden onClick={ changeAvatarPic }></canvas>
                    </Grid>
                    <Grid item xs={6}>
                        <canvas id="myCanvas-2" hidden onClick={ changeAvatarPic }></canvas>
                    </Grid>
                    <Grid item xs={6}>
                        <canvas id="myCanvas-3" hidden onClick={ changeAvatarPic }></canvas>
                    </Grid>
                    <Grid item xs={12}>
                        <canvas id="myCanvas-4" hidden onClick={ changeAvatarPic }></canvas>
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