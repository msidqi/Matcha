import React, { useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { saveUser } from '../reduxx/actions/save';
import UserInput from '../components/UserInput';
import Submit from '../components/Submit';
import conf from '../config/config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ls from 'local-storage';
import UserState from '../components/UserState';


function CanvasFromInput(props) {

    const init = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
    const [Login, setLogin] = useState(init);

    const {connected, completed} = UserState();

    const dispatch = useDispatch();

    const handleChange = (obj) => {
      setLogin({...Login, ...obj});
    }

    function loadCanvasWithInputFile(files) {
        var canvas = document.getElementById(props.id);
        var context = canvas.getContext("2d");
        var img = new Image();

        var files = e.target.files;
        var file = files[0];
        if(file.type.match('image.*')) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                if( e.target.readyState == FileReader.DONE) {
                    img.src = e.target.result;
                    img.onload = () => {
                        console.log(img.width, img.height, canvas.height, img.width * (canvas.height / img.height), canvas.height / img.height);
                        if (img.width > img.height)
                            context.drawImage(img, 0, 0, canvas.width, img.height * (canvas.height / img.height));
                        else
                            context.drawImage(img, 0, 0, img.width * (canvas.width / img.width), canvas.width);
                    };
                }
            }
        } else {
            alert("not an image");
        }
    }
    
    return (
      <>
        <input
            onChange={ loadCanvasWithInputFile }
            style={{ display: "none" }}
            id={props.id} type="file" name={props.name} multiple={props.multiple}
        />
      </>
    );
}

export default CanvasFromInput;