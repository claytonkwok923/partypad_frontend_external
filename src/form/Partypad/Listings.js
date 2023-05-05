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
import useMediaQuery from '@material-ui/core/useMediaQuery';



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
        flex: "0 0 70%",
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

const photos = ["https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1537726235470-8504e3beef77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1552242718-c5360894aecd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1639259885918-b8ee9b8374b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1567&q=80",
    "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=958&q=80", "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80", "https://images.unsplash.com/photo-1596204976717-1a9ff47f74ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
]

const Listings = () => {
    const classes = useStyles();
    const [cookies, setCookie] = useCookies(['token']);
    const [rooms, setRooms] = useState([]);
    const history = useHistory();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('api/roomsByUsername', {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                });
                console.log(response.data)
                setRooms(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [cookies.token]);

    const handleDelete = async (roomId) => {
        try {
            const response = await axios.delete(`/api/rooms/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`,
                },
            });
            setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
            console.log(response.data);

        } catch (error) {
            console.error(error);

        }
    };

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

                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="listings table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell align="right">Image</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rooms.map((room) => (
                                            <TableRow key={room.id}>
                                                <TableCell component="th" scope="row">
                                                    {room.title}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <img src={room.image ? room.image : photos[Math.floor(Math.random() * photos.length)]} alt={room.title} height="100" />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton
                                                        aria-label="edit listing"
                                                        className={classes.editButton}
                                                        component={Link}
                                                        to={`/updateRoomForm/${room.id}`}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="delete listing"
                                                        onClick={() => handleDelete(room.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Paper>
                </Container>
            </div >
        </div >
    );

};
export default Listings;