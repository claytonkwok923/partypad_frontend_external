import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        [theme.breakpoints.down("xs")]: {
            width: "800px"
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        [theme.breakpoints.up("sm")]: {
            maxWidth: "none",
            width: "100%",
            marginLeft: 0,
            marginRight: 0,
        },
    },
    appBar: {
        backgroundColor: theme.palette.grey[500],
    },
    navButton: {
        fontSize: "1rem",
        marginLeft: theme.spacing(2),
    }

}));

export default function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/listings" style={{ color: "#fff" }}>
                            <Button className={classes.navButton} color="inherit">
                                Listings
                            </Button>
                        </Link>
                        <Link to="/trips" style={{ color: "#fff" }}>
                            <Button className={classes.navButton} color="inherit">
                                Trips
                            </Button>
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
