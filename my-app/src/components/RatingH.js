import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff3d47',
  },
  iconHover: {
    color: '#ff6d75',
  },
})(Rating);

export default function RatingH(props) {
  console.log('props.score', props.score)
  return (
      <Box component="fieldset" mb={3} borderColor="transparent">
        {props.label ? <Typography component="legend">{props.label}</Typography> : ''}
        <StyledRating
          readOnly
          value={props.score}
          precision={1}
          size="small"
          icon={<FavoriteIcon fontSize="inherit" />}
        />
      </Box>
    // <Box component="fieldset" mb={3} borderColor="transparent">
    //     {props.label ? <Typography component="legend">{props.label}</Typography> : ''}
    //     <Rating
    //       name={props.name}
    //       value={props.score}
    //       precision={0.5}
    //       emptyIcon={<StarBorderIcon fontSize="inherit" />}
    //     />
    //   </Box>
  );
}