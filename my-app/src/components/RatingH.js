import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

function getLabelText(value) {
  return `${value} Heart${value !== 1 ? 's' : ''}`;
}

export default function RatingH(props) {
  return (
      <Box component="fieldset" mb={3} borderColor="transparent">
        {props.label ? <Typography component="legend">{props.label}</Typography> : ''}
        <StyledRating
          name={props.name}
          value={props.score}
          getLabelText={getLabelText}
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