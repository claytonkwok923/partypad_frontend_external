import React, { useState } from "react";
import {
    Grid,
    TextField,
    Button,
    Popover,
    Typography,
    makeStyles,
    Box,
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
                    onChange={(event) => setCheckOutDate(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>


            <Grid item xs={8} sm={1}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    style={{ marginLeft: "8px" }}
                >
                    Search
                </Button>
            </Grid>


            <Grid item xs={12} sm={2}>
                <Box display="flex" alignItems="center" justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handlePopoverOpen}
                    >
                        <AccountCircleIcon />
                        &nbsp; User
                    </Button>

                    <Popover
                        Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <div className={classes.popover}>
                            <Typography variant="h6">Welcome!</Typography>
                            <div>
                                <Button color="primary" onClick={handleLogin}>Login</Button>
                                <Button color="primary">Sign Up</Button>
                            </div>
                        </div>
                    </Popover>
                </Box>
            </Grid>

        </Grid>
    );
}






