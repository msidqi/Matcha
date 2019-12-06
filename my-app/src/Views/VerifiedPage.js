import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, makeStyles, Grow, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import conf from '../config/config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
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
        textAlign:  'center',
        height: '400px',
    },
    banner: {
        background: '#b30000',
        height: '50px',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
    },
}));

function VerifiedPage(props) {

    // const connected = ls.get('connected');
    const classes = useStyles();

    var connected = useSelector(state => state.user.connected);

    const [toNext, settoNext] = useState(false);
    const [Verified, setVerified] = useState(false);

    const redirect = () => {
        settoNext(true);
    }

    const verify = async () => {
        let token = props.match.params.token;
        let id = props.match.params.id;
        if (!token || !id)
            return ;
        try {
            let result = await axios.post(`/api/${conf.apiVer}/verification/${id}/${token}`);
            if (result.data.status === 'OK')
                setVerified(true);
        }
        catch (err){
            console.log(err);
        }
    }

    useEffect(() => {
        verify();
    }, [])

    return (
        <>
      <Container className={ classes.card} maxWidth='sm'>
        {connected && <Redirect to="/home"/>}
        {toNext && <Redirect to="/login"/>}
        <Grid item xs={12} className={classes.banner}>
        </Grid>
            <Grid container spacing={0} className={`${classes.paddingLeftRight} ${classes.info}`}>
                {Verified && 
                <Grid item xs={12} className={classes.info}>
                    <h4>You account is now verified!</h4>
                    <h6>please fill in few additional informations about what yourself so we can customize the experience to your liking.</h6>
                </Grid>
                }
                <Grid item xs={12} className={classes.continue}>
                    <Button
                        className={classes.button}
                        onClick={ redirect }
                        type="submit"
                        color="primary"
                        >
                        Continue
                    </Button>
                </Grid>
            </Grid>
      </Container>
      </>
    );
}

export default VerifiedPage;