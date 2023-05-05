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
    Grid,
    Box
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


const photos = ["https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"]

const BookingPage = () => {



    // const validationSchema = Yup.object().shape({
    //     numGuests: Yup.number()
    //         .min(1, "Guests must be at least 1.")
    //         .max(5, "Guests cannot be more than 5.")
    //         .required("Guests is required."),
    //     startDate: Yup.date().required("Start date is required."),
    //     endDate: Yup.date()
    //         .min(Yup.ref("startDate"), "End date cannot be before start date.")
    //         .required("End date is required.")
    // });
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
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



    const onSubmit = async (data) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${cookies.token}`,
                },
            };
            const response = await axios.post(
                '/api/rooms',
                {

                    "title": "test room",
                    "description": "testing room",
                    "price": 1000,
                    "location": "test location",
                    "guests": 2,
                    "size": 30
                },
                config
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>

            <Box px={3} py={2}>
                <Typography variant="h6" align="center" margin="dense">
                    Post a Room
                </Typography>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="title"
                            name="title"
                            label="title"
                            fullWidth
                            margin="dense"
                            {...register('title')}
                            error={errors.title ? true : false}
                        />
                        <Typography variant="inherit" color="textSecondary">
                            {errors.title?.message}
                        </Typography>
                    </Grid>


                </Grid>

                <Box mt={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>


        </>
    );
};

export default BookingPage;
