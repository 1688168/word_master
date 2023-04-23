import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "2rem",
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
  _grid: {
    mt: 2,
    spacing: 2,
    alignItems: "flex-end",
    display: "flex",
    margin: "1rem",
  },
}));

function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary" className={classes.appbar}>
          <Toolbar disableGutters={true}>
            <Grid container>
              <grid item className={classes._grid}>
                <Link to="/">main</Link>
              </grid>
              <grid item className={classes._grid}>
                <Link to="/admin">Admin</Link>
              </grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default Header;
