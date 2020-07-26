import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import conf from '../config/config';
import RatingH from './RatingH';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    maxWidth: 345,
  },
  media: {
    height: 400,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function UserCard({ user: user, ...rest }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = useState({isHearted: user.hearted ? true : false, isMatched: user.matched ? true : false});
  // const [isHearted, setIsHearted] = useState(user.hearted ? true : false);
  // const [isMatched, setIsMatched] = useState(user.matched ? true : false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const matcheUser = async (uuid) => {
    try {
      let body = { uuid: uuid };
      let toSend = (data.isHearted) ? { data: body } : body;

      if (!data.isHearted) {
        await axios.post(`/api/${conf.apiVer}/users/matches`, toSend);
        setData({isHearted: true, isMatched: user.heartedBack ? true : false});
      } else if (data.isHearted) {
        await axios.delete(`/api/${conf.apiVer}/users/matches`, toSend);
        setData({isHearted: false, isMatched: false});
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  console.log('user: ', user.uuid)
  return (
    <Card className={classes.card} name={user.uuid}>
      <CardMedia
        className={classes.media}
        image={user.pictures[user.picIndex] ? `${conf.apiImages}/${user.pictures[user.picIndex]}` : "https://icon-library.net/images/placeholder-image-icon/placeholder-image-icon-14.jpg"}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {`${user.username}, ${user.age}`}
        </Typography>
          {`${parseInt(user.distance)} m away.`}
        <RatingH
          score={user.score}
          name="score"
        />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"
        name={user.uuid}
        onClick={() => { matcheUser(user.uuid) }}
        >
          <FavoriteIcon
          color={data.isHearted ? 'secondary' : 'action'}
        />
        </IconButton>

        <IconButton aria-label="share">
          <AccountBoxRoundedIcon />
        </IconButton>

          <IconButton aria-label="share"
            disabled={(data.isMatched && data.isHearted) ? false : true}
          >
            <ChatRoundedIcon />
          </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>bio:
          <Typography paragraph>
            {user.bio ? user.bio : `Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.`}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}