import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
    Button,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    makeStyles,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
} from "@material-ui/core";

import { Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import { useParams, useNavigate } from "react-router-dom";



const UpdateRoomForm = () => {

    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['token']);

    const [room, setRoom] = useState({});

    const { id } = useParams();






    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        price: Yup.number()
            .required('Price is required')
            .positive('Price must be greater than 0'),
        location: Yup.string().required("Location is required"),
        guests: Yup.number()
            .required('Guests are required')
            .positive('Guest must be greater than 0'),
        size: Yup.number()
            .required('Size is required')
            .positive('Size must be greater than 0'),

    });

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`api/rooms/${id}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                });
                console.log(response.data);
                setRoom(response.data);
                setValue("title", response.data.title);
                setValue("description", response.data.description);
                setValue("price", response.data.price);
                setValue("location", response.data.location);
                setValue("guests", response.data.guests);
                setValue("size", response.data.size);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id, cookies]);





    const onSubmit = async (data) => {

        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${cookies.token}`,
                },
            };
            const response = await axios.put(
                '/api/rooms',
                {
                    id: room.id,
                    username: room.username,
                    ...data
                },
                config
            );
            console.log("res", response.data);

            navigate("/listings")


        } catch (error) {
            console.error(error);
        }
    };

    return (
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
                        value={room.title}
                        error={errors.title ? true : false}
                        onChange={(e) => {
                            setRoom({ ...room, title: e.target.value })
                            setValue('title', e.target.value)
                        }}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.title?.message}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="description"
                        name="description"
                        label="description"
                        fullWidth
                        margin="dense"
                        {...register('description')}
                        value={room.description}
                        error={errors.description ? true : false}
                        onChange={(e) => {
                            setRoom({ ...room, description: e.target.value })
                            setValue('description', e.target.value)
                        }}

                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.description?.message}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="price"
                        name="price"
                        label="price"
                        fullWidth
                        margin="dense"
                        {...register('price')}
                        value={room.price}
                        error={errors.price ? true : false}
                        onChange={(e) => {
                            setRoom({ ...room, price: e.target.value })
                            setValue('price', e.target.value)
                        }}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.price?.message}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="location"
                        name="location"
                        label="location"
                        fullWidth
                        margin="dense"
                        {...register('location')}
                        value={room.location}
                        error={errors.location ? true : false}
                        onChange={(e) => {
                            setRoom({ ...room, location: e.target.value })
                            setValue('location', e.target.value)
                        }}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.location?.message}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="guests"
                        name="guests"
                        label="guests"
                        fullWidth
                        margin="dense"
                        {...register('guests')}
                        value={room.guests}
                        error={errors.guests ? true : false}
                        onChange={(e) => {
                            setRoom({ ...room, guests: e.target.value })
                            setValue('guests', e.target.value)
                        }}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.guests?.message}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="size"
                        name="size"
                        label="size"
                        fullWidth
                        margin="dense"
                        {...register('size')}
                        value={room.size}
                        error={errors.size ? true : false}
                        onChange={(e) => {
                            setRoom({ ...room, size: e.target.value })
                            setValue('size', e.target.value)
                        }}
                    />
                    <Typography variant="inherit" color="textSecondary">
                        {errors.size?.message}
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

    );
};

export default UpdateRoomForm;