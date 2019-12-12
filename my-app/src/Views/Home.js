import React from 'react';
import ProfileShort from '../components/ProfileShort';
import { makeStyles, Container, Grid } from '@material-ui/core';
import UserState from '../components/UserState';

const useStyles = makeStyles(theme => ({
  container: {
    background: 'yellow',
    // width: '100%',
    // height: '100vh',
    // display: 'inline',
    // overflow: 'auto',
    // height: '100vw'
  },
  leftcontainer: {
    // float: 'left',
    height: '100vh',
    background: 'red',
    [theme.breakpoints.down('sm')]: {
      height: '100px',
      maxWidth: '100%',
    },
    // display: 'inline-block',
    // width: 200,
    // height: 200,
    // height: '100%'
  },
  rightcontainer: {
    // float: 'left',
    height: '100%',
    background: 'blue',
    // display: 'inline-block',
    // display: 'inline',
    // width: '50%',
    // height: '100px'
  },
  content: {
    position: 'sticky',
    float: 'right',
    textAlign:  'center',
    background: 'orange',
    [theme.breakpoints.down('sm')]: {
      minHeight: '100px',
      maxWidth: '100%',
    },
    minHeight: '50%',
    // width: '200px',
    // overflow: 'auto',
    maxWidth: '200px',
    // minWidth: '150px',
  },
  content2: {
    float: 'right',
    textAlign:  'center',
    background: 'green',
    // [theme.breakpoints.down('sm')]: {
    //   height: '100px',
    //   maxWidth: '100%',
    // },
    // height: '100%',
    // width: '200px',
    overflow: 'auto',
    // maxWidth: '200px',
    // minWidth: '150px',
  }
}));

function Home() {
  const {uuid, connected,} = UserState();
  const classes = useStyles();

  return (
      <>
      <Container className={ classes.container }  maxWidth='xl'>
        <Grid container spacing={0}>
          <Grid item xs={12} md={3} className={ classes.leftcontainer }>
            <div className={ classes.content }>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </Grid>
          <Grid item xs={12} md={9} className={ classes.rightcontainer }>
            <div className={ classes.content2 }>
            orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
            </div>
          </Grid>
        </Grid>
      </Container>
      {/* <div className={ classes.container }>
        <div className={ classes.leftcontainer }></div>
        <div className={ classes.rightcontainer }></div>
      </div>
        <ProfileShort />
        <div >
            <h1>Home Page</h1>
        </div> */}
      </>
    );
}

export default Home;
