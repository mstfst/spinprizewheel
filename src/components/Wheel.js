import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative"
  },
  wheel: {
    width: "100%",
    paddingTop: "100%",
    borderRadius: "50%",
    background: `conic-gradient(
      lime 20%, 
      yellow 0 40%, 
      red 40% 60%, 
      blue 60% 80%, 
      orange 80%
    )`,
    transition: "transform 3s"
  },
  arrow: {
    position: "absolute",
    width: 0,
    height: 0,
    borderLeft: "30px solid transparent",
    borderRight: "30px solid transparent",
    borderTop: "50px solid " + theme.palette.grey["300"],
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "10"
  }
}));

export default function Wheel({ rotation }) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}> 
      <div className={classes.arrow} />
      <div
        className={classes.wheel}
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  );
}
