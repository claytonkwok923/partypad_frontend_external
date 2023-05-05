import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    makeStyles,
    TextField,
    Select,
    MenuItem,
    Grid,
    Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    input: {
        margin: theme.spacing(2, 0),
    },
    button: {
        margin: theme.spacing(2, 0),
    },
}));

const CreateRoomForm = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm();
    const [roomType, setRoomType] = useState("");



    const onSubmit = (data) => {
        // Call backend API to submit room data
        console.log(data);
    };

    const handleRoomTypeChange = (event) => {
        setRoomType(event.target.value);
    };

    return (
        <Box className={classes.form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="房間名稱"
                            variant="outlined"
                            {...register('name')}
                            error={errors.name ? true : false}
                            helperText={errors.name ? "請輸入房間名稱" : ""}
                            className={classes.input}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl
                            variant="outlined"
                            className={classes.input}
                            error={errors.roomType ? true : false}
                        >
                            <InputLabel id="roomType-label">房間類型</InputLabel>
                            <Select
                                labelId="roomType-label"
                                id="roomType"
                                value={roomType}
                                onChange={handleRoomTypeChange}
                                label="房間類型"
                                inputRef={register({ required: true })}
                                name="roomType"
                            >
                                <MenuItem value="">
                                    <em>請選擇</em>
                                </MenuItem>
                                <MenuItem value="single">單人房</MenuItem>
                                <MenuItem value="double">雙人房</MenuItem>
                                <MenuItem value="triple">三人房</MenuItem>
                            </Select>
                            {errors.roomType && (
                                <FormHelperText>請選擇房間類型</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="price"
                            name="price"
                            label="價格"
                            variant="outlined"
                            type="number"
                            inputRef={register({ required: true })}
                            error={errors.price ? true : false}
                            helperText={errors.price ? "請輸入價格" : ""}
                            className={classes.input}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="location"
                            name="location"
                            label="位置"
                            variant="outlined"
                            inputRef={register({ required: true })}
                            error={errors.location ? true : false}
                            helperText={errors.location ? "請輸入位置" : ""}
                            className={classes.input}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="startDate"
                            name="startDate"
                            label="起始日期"
                            variant="outlined"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register({ required: true })}
                            error={errors.startDate ? true : false}
                            helperText={errors.startDate ? "請輸入起始日期" : ""}
                            className={classes.input}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="endDate"
                            name="endDate"
                            label="結束日期"
                            variant="outlined"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={register({ required: true })}
                            error={errors.endDate ? true : false}
                            helperText={errors.endDate ? "請輸入結束日期" : ""}
                            className={classes.input}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="description"
                            name="description"
                            label="描述"
                            variant="outlined"
                            multiline
                            rows={4}
                            inputRef={register({ required: true })}
                            error={errors.description ? true : false}
                            helperText={errors.description ? "請輸入房間描述" : ""}
                            className={classes.input}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    提交
                </Button>
            </form>
        </Box>

    );
};

export default CreateRoomForm;