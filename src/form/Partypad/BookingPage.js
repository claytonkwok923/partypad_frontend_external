import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@material-ui/core";
import { useCookies } from 'react-cookie';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../component/SearchBar/SearchBar";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/authAction";


const useStyles = makeStyles({
    root: {
        maxWidth: 600,
        margin: "auto",
        marginTop: 50,
        padding: 20,
    },
    media: {
        height: 400,
    },
    formControl: {
        margin: "10px 0",
        minWidth: 120,
    },
});


const photos = ["https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"]

const BookingPage = () => {

    const validationSchema = Yup.object().shape({
        guests: Yup.number()
            .required('Guests are required')
            .positive('Guest must be greater than 0'),
        startDate: Yup.date()
            .required("Start date is required.")
            .min(new Date(), "Start date must be later than today"),
        endDate: Yup.date()
            .required("End date is required.")
            .min(
                Yup.ref("startDate"),
                "End date must be later than or equal to the start date."
            )
            .test(
                "is-greater-than-start-date",
                "End date must be later than the start date.",
                function (value) {
                    const startDate = this.resolve(Yup.ref("startDate"));
                    return startDate < value;
                }
            )
    });



    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(
        (state) => {
            console.log("isAuth", state.isAuthenticated);
            return state.isAuthenticated

        }
    );

    const [cookies, setCookie] = useCookies(['token']);

    const [room, setRoom] = useState({});

    const { id } = useParams();
    const [numGuests, setNumGuests] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loginOpen, setLoginOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`api/rooms/${id}`);
                console.log(response.data);
                setRoom(response.data);

            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const handleLoginOpen = () => {
        setLoginOpen(true);
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const onSubmit = async (data) => {

        console.log("booking page on submit")

        if (cookies.token && isAuthenticated) {
            console.log("booking page data", data);

            const startDate = moment(data.startDate);
            const endDate = moment(data.endDate);
            const nights = endDate.diff(startDate, 'days');
            const totalPrice = nights * room.price;



            const passingData = {
                "checkinDate": moment(data.startDate).format("YYYY-MM-DD"),
                "checkoutDate": moment(data.endDate).format("YYYY-MM-DD"),
                "guests": data.guests,
                "totalPrice": totalPrice,
                "status": "S",
                "roomId": room.id,
                "host": room.username
            }

            console.log("passingData", passingData)

            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${cookies.token}`,
                    },
                };
                const response = await axios.post(
                    '/api/bookings', passingData
                    ,
                    config
                );
                console.log(response.data);
                navigate("/trips")
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Please login in first ")
            handleLoginOpen();
        }


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
                // handle error response
            });
    };


    return (
        <>
            <SearchBar />
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={room.image ? room.image : photos[Math.floor(Math.random() * photos.length)]}
                        alt={room.title}
                        title="Room Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {room.title}
                        </Typography>
                        <Typography variant="h6" component="h3">
                            Location: {room.location}
                        </Typography>
                        <Typography variant="h6" component="h3">
                            Price: ${room.price} per night
                        </Typography>
                        <Typography variant="h6" component="h3">
                            Size: {room.size} ft
                        </Typography>
                        <Typography variant="h6" component="h3">
                            Host: {room.username}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                            Description: {room.description}
                        </Typography>



                        {/* <form noValidate autoComplete="off"> */}

                        <br></br>
                        <TextField
                            required
                            id="guests"
                            name="guests"
                            label="guests"
                            fullWidth
                            margin="dense"
                            {...register('guests')}
                            error={errors.guests ? true : false}
                        />
                        <Typography variant="inherit" color="textSecondary">
                            {errors.guests?.message}
                        </Typography>
                        <TextField
                            required
                            id="startDate"
                            name="startDate"
                            label="Start Date"
                            type="date"
                            value={startDate}
                            {...register('startDate')}
                            error={errors.title ? true : false}
                            onChange={(e) => setStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Typography variant="inherit" color="textSecondary">
                            {errors.startDate?.message}
                        </Typography>
                        <TextField
                            required
                            id="endDate"
                            name="endDate"
                            label="End Date"
                            type="date"
                            value={endDate}
                            {...register('endDate')}
                            error={errors.endDate ? true : false}
                            onChange={(e) => setEndDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Typography variant="inherit" color="textSecondary">
                            {errors.endDate?.message}
                        </Typography>
                        {/* </form> */}
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <div style={{ marginLeft: 'auto' }}>
                        <Button size="large" color="primary" onClick={handleSubmit(onSubmit)}>
                            Book Room
                        </Button>
                        <Button
                            size="large"
                            color="secondary"
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                    </div>
                </CardActions>
            </Card>
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

        </>
    );
};

export default BookingPage;
