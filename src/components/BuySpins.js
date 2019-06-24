import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ChooseSpinsForm from "./buyspins/ChooseSpinsForm";
import ReviewOrder from "./buyspins/ReviewOrder";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";

//was originally going to use a Stepper, but did not yet
//will keep this in for the future possiblity of using one
const steps = ["Choose Number of Spins", "Review Order"];

const useStyles = makeStyles(theme => ({
  root: {
    width: "250px"
  },
  content: {
    minHeight: "210px"
  },
  buttons: {
    margin: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

export default function BuySpins(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [spinsToBuy, setSpinsToBuy] = useState(0);

  const { setNumSpinsOwned, closeDrawer } = props;

  const handleNextClick = () => {
    if (activeStep === 1) {
      setNumSpinsOwned(spinsToBuy);
    }
    setActiveStep(activeStep + 1);
  };

  const handlePrevClick = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = activeStep => {
    switch (activeStep) {
      case 0:
        return (
          <ChooseSpinsForm
            spinsToBuy={spinsToBuy}
            setSpinsToBuy={setSpinsToBuy}
          />
        );
      case 1:
        return <ReviewOrder spinsToBuy={spinsToBuy} />;
      default:
        throw new Error("no such active state");
    }
  };

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Buy Spins
      </Typography>
      {activeStep === steps.length ? (
        <React.Fragment>
          <div className={classes.content}>
            <Typography variant="h6" gutterBottom>
              Success
            </Typography>
          </div>
          <div className={classes.buttons}>
            <Button color="primary" variant="contained" onClick={closeDrawer}>
              Close
            </Button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={classes.content}>{getStepContent(activeStep)}</div>
          <div className={classes.buttons}>
            {activeStep !== 0 && (
              <Button
                color="primary"
                onClick={handlePrevClick}
                className={classes.button}
              >
                Back
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextClick}
              className={classes.button}
            >
              Next
            </Button>
          </div>
        </React.Fragment>
      )}
    </Container>
  );
}
