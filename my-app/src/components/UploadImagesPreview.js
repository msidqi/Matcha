import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    upload: {
        margin: '5px auto',
        width: '100%',
    },
}));

export default function UploadImagesPreview(props) {

    const classes = useStyles();

    const changeAvatarPic = (event, img, startIndex) => {
        let avatarPic = document.getElementById('Avatar').getElementsByTagName('img')[0];
        let index = event ? event.target.name : startIndex;
        avatarPic.src = event ? event.target.src : img.src;
        setSetup({...setup, picIndex: index});
    }

    return (
        <>
            <Grid item xs={12}>
                    <div>
                        <label className={classes.upload}>
                            Click to select your photos...{ setup.picturesError }
                            <input
                                onChange={ handleInputChange }
                                style={{ display: "none" }}
                                id="pictures" type="file" name="pictures" multiple
                            />
                        </label>
                    </div>
            </Grid>
            {props.setup.pictures.map( (file, index) => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (event) => {
                    if( event.target.readyState == FileReader.DONE) {
                        let img = new Image();
                        img.src = event.target.result;
                        img.onload = () => {
                            let myImage = document.getElementById(`myImage-${index}`);
                            myImage.src = img.src;
                        };
                    };
                }
                return (<Grid item xs={6} key={index}>
                <img id={`myImage-${index}`} name={index} src="" onClick={ changeAvatarPic }/>
                </Grid>);
            })}
        </>
    );
}
