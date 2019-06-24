import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Wheel from "./Wheel";
import {
  NUM_PRIZES,
  MIN_ROTATE_ANGLE,
  ROTATION_OFFSET,
} from '../config';

function getRandomPrizeIndex() {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Math.floor(Math.random() * Math.floor(NUM_PRIZES));
}

function getNewRotation(prevRotation, prizeIndex) {
  //if wheel was at pos 0, this is how much we would
  //need to rotate the wheel by to make the new
  //prize's position at the top
  const prizePosAngle = (prizeIndex / NUM_PRIZES) * 360;
  const normalizedRotateAngle = prevRotation % 360;
  let degreesToRotate;
  if (normalizedRotateAngle > prizePosAngle) {
    degreesToRotate = prizePosAngle + 360 - normalizedRotateAngle;
  } else {
    degreesToRotate = prizePosAngle - normalizedRotateAngle;
  }
  return prevRotation + MIN_ROTATE_ANGLE + 
    degreesToRotate + ROTATION_OFFSET;
}

const useStyles = makeStyles(theme => {
  console.log(theme);
  
  return {
  '@keyframes pulse': {
    from: {backgroundColor: theme.palette.primary.light},
    to: {backgroundColor: theme.palette.secondary.light}
  },
  root: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden'
  },
  btn : {
    // margin: theme.spacing(2)
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    width: '25%',
    height: '25%'
  }
};
});


export default function SpinWheel(props) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [crntRotation, setRotation] = useState(0);

  const { onWinPrize, onSpin, enabled } = props;

  const handleSpinBtnClick = async e => {
    onSpin();
    e.preventDefault();
    const prizeIndex = getRandomPrizeIndex();
    setIsSpinning(true);
    setRotation(getNewRotation(crntRotation, prizeIndex));
    await new Promise((resolve, reject) => {
      setTimeout(() => { resolve(); }, 3000); 
    });
    onWinPrize(prizeIndex);
    setIsSpinning(false);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Wheel rotation={crntRotation} />
      <Button
        variant="contained"
        color="default"
        size="large"
        className={classes.btn}
        disabled={isSpinning || !enabled}
        onClick={handleSpinBtnClick}
      >
        SPIN
      </Button>
    </div>
  );
}
