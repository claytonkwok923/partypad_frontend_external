import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
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
import axios from 'axios';
import { login, logout } from "../../redux/authAction";
import { useHistory } from "react-router-dom";

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
    iconButton: {
        margin: "5px 0px",
    }
}));

export default function SearchBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [loginOpen, setLoginOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [isLogin, setIsLogin] = useState(false);





    const history = useHistory();

    const isAuthenticated = useSelector(
        (state) => {
            console.log("isAuth", state.isAuthenticated);
            return state.isAuthenticated

        }
    );



    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleLoginOpen = () => {
        setLoginOpen(true);
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    const handleSignUpOpen = () => {
        setSignUpOpen(true);
    };

    const handleSignUpClose = () => {
        setSignUpOpen(false);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleSignUpUsernameChange = (event) => {
        setSignUpUsername(event.target.value);
    };

    const handleSignUpPasswordChange = (event) => {
        setSignUpPassword(event.target.value);
    };

    const handleLoginSubmit = () => {

        axios.post('api/v1/auth/authenticate', {
            "username": username,
            "password": password
        })
            .then(response => {
                console.log("response  :", response)
                // handle success response
                const token = response.data.access_token;
                console.log("token :", token)
                // set token in cookie with expiration time
                setCookie('token', token, { maxAge: 3600 }); // expires in 1 hour
                // dispatch action to update authenticated status in Redux store
                dispatch(login());
                handleLoginClose();

                alert("login successful!");



            })
            .catch(error => {
                console.log("err :", error);
                alert(error);
            });
    };



    const handleSignUpSubmit = () => {

        axios.post('api/v1/auth/register', {
            "username": signUpUsername,
            "password": signUpPassword,
            "enabled": 1

        })
            .then(response => {
                console.log("response  :", response)
                // handle success response
                const token = response.data.access_token;
                console.log("token :", token)
                // set token in cookie with expiration time
                setCookie('token', token, { maxAge: 3600 }); // expires in 1 hour
                // dispatch action to update authenticated status in Redux store
                dispatch(login());
                handleSignUpClose();

                alert("sign up and login successful!");


            })
            .catch(error => {
                console.log("err :", error);
                alert(error)
                // handle error response
            });
    };


    const handlePostRoomClick = () => {
        const jwtToken = cookies.token;
        console.log("jwt token", jwtToken);

        if (jwtToken && isAuthenticated) {
            console.log("jwt token got")
            history.push("/createRoomForm");
        } else {
            console.log("no jwt token")
            handleLoginOpen();
            // redirectToPostRoom();
        }
    };

    const handleIconClick = () => {
        history.push("/")
    }

    const redirectToPostRoom = () => {
        console.log("redirectToPostRoom ".cookies.token)
        if (cookies.token) {
            history.push("/createRoomForm");
        }

    }
    return (
        <div>
            <Grid container spacing={1} className={classes.searchContainer}>
                <Grid item xs={12} sm={2} className={classes.logoContainer} onClick={handleIconClick}>
                    <img src={logo} alt="Logo" className={classes.logo} />
                    <Typography variant="h6" component="h1">
                        PARTYPAD
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Button variant="outlined" color="success" onClick={handlePostRoomClick}>
                        Post Room
                    </Button>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Button aria-describedby={open ? 'login-popover' : undefined} onClick={handlePopoverOpen}>
                        <AccountCircleIcon />
                    </Button>
                    <Popover
                        id={open ? 'login-popover' : undefined}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {isAuthenticated ?
                            <Box className={classes.popover} style={{ display: "flex", "flex-direction": "column" }}>
                                <Typography>
                                    Welcome to PARTYPAD!
                                </Typography>
                                <Button className={classes.iconButton} variant="outlined" color="primary" onClick={() => {
                                    history.push("/listings")
                                }}>
                                    Dashboard
                                </Button>
                                <Button className={classes.iconButton} variant="contained" color="primary" onClick={() => {
                                    history.push("/listings")
                                }}>
                                    Listing
                                </Button>
                                <Button className={classes.iconButton} variant="contained" color="primary" onClick={() => {
                                    history.push("/trips")
                                }}>
                                    Trips
                                </Button>
                                <Button className={classes.iconButton} variant="contained" color="secondary" onClick={() => {
                                    removeCookie("token");
                                    dispatch(logout());
                                    history.push("/")
                                }}
                                >
                                    Logout
                                </Button>
                            </Box>
                            : <Box className={classes.popover} style={{ display: "flex", "flex-direction": "column" }}>
                                <Typography>
                                    Welcome to PARTYPAD!
                                </Typography>
                                <Button className={classes.iconButton} variant="outlined" onClick={handleLoginOpen}>
                                    Login
                                </Button>
                                <Button className={classes.iconButton} variant="outlined" onClick={handleSignUpOpen}>
                                    Sign up
                                </Button>
                            </Box>

                        }

                    </Popover>
                </Grid>
                <Dialog open={loginOpen} onClose={handleLoginClose}>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your username and password to login.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={handlePasswordChange}
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
                <Dialog open={signUpOpen} onClose={handleSignUpClose}>
                    <DialogTitle>Sign Up</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your username and password to sign up.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="signUpUsername"
                            label="Username"
                            type="text"
                            fullWidth
                            value={signUpUsername}
                            onChange={handleSignUpUsernameChange}
                        />
                        <TextField
                            margin="dense"
                            id="signUpPassword"
                            label="Password"
                            type="password"
                            fullWidth
                            value={signUpPassword}
                            onChange={handleSignUpPasswordChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSignUpClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSignUpSubmit} color="primary">
                            SignUp
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            <div style={{ borderBottom: "2px solid #eee", margin: "5px 0px 0px 0px" }}></div>
        </div >
    );
}

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
