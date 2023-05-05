


import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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


const useStyles = makeStyles({
    table: {
        minWidth: 650,
        margin: "0 auto",
        maxWidth: "80vw",
    },
    container: {
        marginTop: "5rem",
    },
});





const Trips = () => {

    const classes = useStyles();


    const [cookies, setCookie] = useCookies(['token']);

    const [trips, setTrips] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('api/bookings/guest', {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                });
                console.log(response.data)
                setTrips(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [cookies.token]);


    // const trips = [
    //     {
    //         id: 1,
    //         status: 'Confirmed',
    //         location: 'New York',
    //         host: 'John',
    //         dates: '2023/05/01 - 2023/05/07'
    //     },
    //     {
    //         id: 2,
    //         status: 'Pending',
    //         location: 'Los Angeles',
    //         host: 'Jane',
    //         dates: '2023/06/01 - 2023/06/07'
    //     },
    //     {
    //         id: 3,
    //         status: 'Cancelled',
    //         location: 'San Francisco',
    //         host: 'Tom',
    //         dates: '2023/07/01 - 2023/07/07'
    //     }
    // ];

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
            <div className={classes.container}>
                <TableContainer component={Paper} className={classes.table}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Location</TableCell>
                                <TableCell align="center">Host</TableCell>
                                <TableCell align="center">Dates</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trips.map((trip) => (
                                <TableRow key={trip.id}>
                                    <TableCell component="th" scope="row">
                                        {handleStatus(trip.status)}
                                    </TableCell>
                                    <TableCell align="center">{trip.room.title}</TableCell>
                                    <TableCell align="center">{trip.room.location}</TableCell>
                                    <TableCell align="center">{trip.host}</TableCell>
                                    <TableCell align="center">{trip.checkinDate.replaceAll("-", "/")} - {trip.checkoutDate.replaceAll("-", "/")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );

}


export default Trips;