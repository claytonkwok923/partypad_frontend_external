import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import SearchBar from "../../component/SearchBar/SearchBar";



const CreateRoomForm = () => {

    const history = useHistory();
    const [cookies, setCookie] = useCookies(['token']);



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
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });



    const [roomType, setRoomType] = useState("");



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
                    ...data,
                },
                config
            );
            console.log(response.data);
            history.push("/listings");
        } catch (error) {
            console.error(error);
        }
    };


    // const onSubmit = (data) => {
    //     // Call backend API to submit room data
    //     console.log(data);
    // };

    // const onSubmit = data => {
    //     console.log(JSON.stringify(data, null, 2));
    // };

    const handleRoomTypeChange = (event) => {
        setRoomType(event.target.value);
    };

    return (
        <>
            <SearchBar />
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="description"
                            name="description"
                            label="description"
                            fullWidth
                            margin="dense"
                            {...register('description')}
                            error={errors.description ? true : false}
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
                            error={errors.price ? true : false}
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
                            error={errors.location ? true : false}
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
                            error={errors.guests ? true : false}
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
                            error={errors.size ? true : false}
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
        </>

    );
};

export default CreateRoomForm;