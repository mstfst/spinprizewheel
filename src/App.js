import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import SpinWheel from "./components/SpinWheel";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Drawer from '@material-ui/core/Drawer';
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CloseIcon from "@material-ui/icons/Close";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import BuySpins from "./components/BuySpins";
import { 
  PRIZE_INDEX_MAP,
  STARTING_SPINS
 } from "./config";

const SnackbarTransition = props => <Slide {...props} direction="up" />;

const useStyles = makeStyles(theme => ({
  paperVert: {
    margin: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paperHoriz: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(3),
  },
  button: {
    // margin: theme.spacing(1),
  },
  numSpins: {
    margin: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
}));

export default function App(props) {
  //option for user to see list of prizes won is setup, 
  //but not yet used in this implementation - maybe in 
  //the future
  const [prizeList, setPrizeList] = useState([]);
  const [numSpins, setNumSpins] = useState(STARTING_SPINS);
  const [snackbarOpen, setSnackbarOpen] = 
    useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleWinPrize = prizeIndex => {
    const result = [prizeIndex, ...prizeList];
    setPrizeList(result);
    setSnackbarMsg(`You won prize ${PRIZE_INDEX_MAP[prizeIndex]}!`);
    setSnackbarOpen(true);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSpin = () => {
    setNumSpins(numSpins - 1);
    setSnackbarOpen(false);
  }

  const setNumSpinsOwned = spinsToBuy => {
    setNumSpins(numSpins + spinsToBuy);
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar 
        color="default"
        position="relative">
        <Toolbar>
          <Typography 
            variant="h5" 
            component="h1" 
            className={classes.title}
          >
            Spin the Wheel
          </Typography>
          <Typography variant="h5" component="h6" className={classes.numSpins}>
              {`${numSpins} Spin${numSpins !== 1 ? 's' : ''} left`}
          </Typography>
          <IconButton
            color="primary"
            className={classes.button}
            aria-label="Add to shopping cart"
            edge="end"
            onClick={toggleDrawer}
          >
            <AddShoppingCartIcon  fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>
    <Container component="main" maxWidth="sm">
      <div className={classes.paperVert}>
        <SpinWheel onWinPrize={handleWinPrize} onSpin={handleSpin} enabled={numSpins > 0} />
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        TransitionComponent={SnackbarTransition}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{snackbarMsg}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Container>
    <Drawer 
      anchor="right" 
      open={drawerOpen} 
      onClose={closeDrawer}>
        <BuySpins 
          setNumSpinsOwned={setNumSpinsOwned}
          closeDrawer={closeDrawer}
        />
    </Drawer>
    </React.Fragment>
  );
}