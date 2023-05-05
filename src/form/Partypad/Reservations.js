import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import SearchBar from "../../component/SearchBar/SearchBar";
import Navbar from "../../component/Navbar/Navbar";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: theme.spacing(4),
    },
    container: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    leftPanel: {
        flex: "0 0 30%",
        marginRight: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: theme.spacing(20),
    },
    rightPanel: {
        flex: "1 1 70%",
    },
    button: {
        marginBottom: theme.spacing(8),
    },
    table: {
        minWidth: 650,
    },
    editButton: {
        marginRight: theme.spacing(2),
    },
}));

const Reservations = () => {
    const classes = useStyles();
    const [cookies, setCookie] = useCookies(['token']);
    const [reservations, setReservations] = useState([]);

    const history = useHistory();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('api/bookings/host', {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                });
                console.log(response.data)
                setReservations(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [cookies.token]);


    const handleStatus = (status) => {

        if (status == "S") {
            return "Success"
        } else {
            return "Pending"
        }
    }

    return (
        <div>
            <SearchBar />
            <Navbar />
            <div className={classes.root}>


                <Container maxWidth="md">
                    <Paper className={classes.container} >
                        <div className={classes.leftPanel}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={() => {
                                    history.push("/listings")
                                }}

                            >

                                Listing
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={() => {
                                    history.push("/reservations")
                                }}
                            >

                                Reservation
                            </Button>
                        </div>
                        <div className={classes.rightPanel}>

                            <TableContainer component={Paper} className={classes.table}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Status</TableCell>
                                            <TableCell align="center">Title</TableCell>
                                            <TableCell align="center">Location</TableCell>
                                            <TableCell align="center">Guest</TableCell>
                                            <TableCell align="center">Dates</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {reservations.map((reservation) => (
                                            <TableRow key={reservation.id}>
                                                <TableCell component="th" scope="row">
                                                    {handleStatus(reservation.status)}
                                                </TableCell>
                                                <TableCell align="center">{reservation.room.title}</TableCell>
                                                <TableCell align="center">{reservation.room.location}</TableCell>
                                                <TableCell align="center">{reservation.guest}</TableCell>
                                                <TableCell align="center">{reservation.checkinDate.replaceAll("-", "/")} - {reservation.checkoutDate.replaceAll("-", "/")}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </div>
                    </Paper>
                </Container>
            </div >
        </div>
    );
};
export default Reservations;