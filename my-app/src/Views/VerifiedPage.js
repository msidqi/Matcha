import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, makeStyles } from '@material-ui/core';
import conf from '../config/config';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import UserState from '../components/UserState';

const useStyles = makeStyles(theme => ({
    card: theme.card,
    paddingLeftRight: theme.paddingLeftRight,
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
    heightAuto: theme.heightAuto,
    info: theme.info,
    message: {
        paddingTop: '50px',
        // padding: '50px',
        minHeight: '300px',
    },
    banner: theme.banner,
}));

function VerifiedPage(props) {

    const classes = useStyles();

    const {connected} = UserState();

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
            <Grid container spacing={0} className={`${classes.paddingLeftRight} ${classes.info} ${classes.heightAuto}`}>
                {Verified && 
                <Grid item xs={12} className={classes.message}>
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