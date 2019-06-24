import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { makeStyles } from "@material-ui/core";
import { SPIN_COST } from "../../config";

const useStyles = makeStyles(theme => ({
  formGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    '& > *': {
      margin: '0 5px'
    }
  },
  formSection: {
    marginBottom: theme.spacing(3)
  }
}));

export default function ChooseSpinsForm(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const { spinsToBuy, setSpinsToBuy } = props;

  const handleInputChange = e => {
    const value =
      e.target.value === "" ? e.target.value : parseInt(e.target.value, 10);

    if (value === "" || (Number.isInteger(value) && value >= 0)) {
      setSpinsToBuy(value);
      setTooltipOpen(false);
    } else {
      setTooltipOpen(true);
    }
  };

  const handleIncreaseSpinCnt = e => {
    if (Number.isInteger(spinsToBuy)) {
      setSpinsToBuy(spinsToBuy + 1);
    } else {
      setSpinsToBuy(1);
    }
  };

  const handleDecreaseSpinCnt = e => {
    if (Number.isInteger(spinsToBuy) && spinsToBuy > 0) {
      setSpinsToBuy(spinsToBuy - 1);
    } else {
      setSpinsToBuy(0);
    }
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Spins
      </Typography>
      <div className={classes.formSection}>
        <div className={classes.formGroup}>
          <IconButton
            aria-label="Delete"
            size="small"
            onClick={handleDecreaseSpinCnt}
          >
            <RemoveCircleIcon />
          </IconButton>

          <Tooltip open={tooltipOpen} title="Please enter a valid number">
            <TextField
              variant="outlined"
              id="spinsToBuy"
              onChange={handleInputChange}
              value={spinsToBuy}
              required
              className={classes.spinsField}
            />
          </Tooltip>
          <IconButton
            aria-label="Delete"
            size="small"
            onClick={handleIncreaseSpinCnt}
          >
            <AddCircleIcon />
          </IconButton>
        </div>
        <Typography variant="body2" align="center">
          Price: $2.00 per Spin
        </Typography>
      </div>
      <Typography
        variant="h6"
        gutterBottom
      >
        Purchase Details
      </Typography>
      <Typography
        variant="body1">
          Total: ${(spinsToBuy * SPIN_COST).toFixed(2)}
      </Typography>
    </React.Fragment>
  );
}
