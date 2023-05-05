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
} from "@material-ui/core";
import { useCookies } from 'react-cookie';
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../component/SearchBar/SearchBar";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';



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


const photos = ["https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1537726235470-8504e3beef77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1552242718-c5360894aecd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1639259885918-b8ee9b8374b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1567&q=80",
    "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=958&q=80", "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80", "https://images.unsplash.com/photo-1596204976717-1a9ff47f74ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
]

const BookingPage = () => {



    const validationSchema = Yup.object().shape({
        numGuests: Yup.number()
            .min(1, "Guests must be at least 1.")
            .max(5, "Guests cannot be more than 5.")
            .required("Guests is required."),
        startDate: Yup.date().required("Start date is required."),
        endDate: Yup.date()
            .min(Yup.ref("startDate"), "End date cannot be before start date.")
            .required("End date is required.")
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
    const history = useHistory();

    const [cookies, setCookie] = useCookies(['token']);

    const [room, setRoom] = useState({});

    const { id } = useParams();
    const [numGuests, setNumGuests] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


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


    const onSubmit = (data) => {
        console.log("hi")
        console.log("data", data)
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

                        <Typography variant="body2" color="textSecondary" component="p">
                            Description: {room.description}
                        </Typography>

                        {/* <form noValidate autoComplete="off"> */}
                        <FormControl className={classes.formControl}>
                            <InputLabel id="guests-label">Guests</InputLabel>
                            <Select
                                labelId="guests-label"
                                id="guests"
                                value={numGuests}
                                onChange={(e) => setNumGuests(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
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
                            onClick={() => history.goBack()}
                        >
                            Back
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </>
    );
};

export default BookingPage;
