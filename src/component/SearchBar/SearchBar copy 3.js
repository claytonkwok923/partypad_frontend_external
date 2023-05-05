import React, { useState } from "react";
import {
    Grid,
    TextField,
    Button,
    Popover,
    Typography,
    makeStyles,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import logo from '../../images/logo.jpg';


const useStyles = makeStyles((theme) => ({
    searchContainer: {
        maxWidth: "95%",
        margin: "0 auto",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    logo: {
        width: "50px",
        height: "50px",
        marginRight: "16px",
    },
    popover: {
        padding: theme.spacing(2),
        display: "flex",
        justifyContent: "space-between",
    },
}));

export default function SearchBar() {
    const classes = useStyles();
    const [destination, setDestination] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [loginOpen, setLoginOpen] = useState(false);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleSearch = () => {
        // handle search functionality
    };

    const handleLoginOpen = () => {
        setLoginOpen(true);
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    return (
        <Grid container className={classes.searchContainer}>
            <Grid item xs={12} sm={4} className={classes.logoContainer}>
                <img src={logo} alt="Logo" className={classes.logo} />
                <Typography variant="h6" component="h1">
                    PARTYPAD
                </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Where are you going?"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                />
            </Grid>
            <Grid item xs={6} sm={1}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Check in"
                    type="date"
                    value={checkInDate}
                    onChange={(event) => setCheckInDate(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={6} sm={1}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Check out"
                    type="date"
                    value={checkOutDate}
                    onChange={(event) => setCheckOutDate(event.targetvalue)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Box display="flex" justifyContent="center">
                    <Button
                        aria-describedby={open ? "login-popover" : undefined}
                        variant="outlined"
                        color="primary"
                        startIcon={<AccountCircleIcon />}
                        onClick={handlePopoverOpen}
                    >
                        Login
                    </Button>
                    <Popover
                        id={open ? "login-popover" : undefined}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <Box className={classes.popover}>
                            <Typography variant="h6">Welcome back!</Typography>
                            <Button color="primary" onClick={handleLoginOpen}>
                                Login
                            </Button>

                        </Box>
                    </Popover>
                    <Dialog open={loginOpen} onClose={handleLoginClose}>
                        <DialogTitle>Login</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter your email and password to login.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="password"
                                label="Password"
                                type="password"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleLoginClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleLoginSubmit} color="primary">
                                Login
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Grid>
        </Grid>
    );
}
