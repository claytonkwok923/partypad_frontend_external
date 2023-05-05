import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import SearchBar from '../../component/SearchBar/SearchBar';



const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: '#fff',
    },
    // searchContainer: {
    //     backgroundColor: 'white',
    //     padding: theme.spacing(4),
    //     borderRadius: 16,
    //     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    //     borderBottom: '3px solid #eee'
    // },
    // searchButton: {
    //     borderRadius: '0px 4px 4px 0px',
    //     height: '100%',
    //     width: '100%',
    //     maxWidth: '120px',
    // },
    roomCard: {
        backgroundColor: 'white',
        padding: theme.spacing(4),
        borderRadius: 16,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        },
    },
    roomImage: {
        width: '100%',
        height: 200,
        objectFit: 'cover',
        borderRadius: 8,
        marginBottom: theme.spacing(2),
    },
}));


const photos = ["https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1537726235470-8504e3beef77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1552242718-c5360894aecd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1639259885918-b8ee9b8374b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1567&q=80",
    "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=958&q=80", "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1568495248636-6432b97bd949?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80", "https://images.unsplash.com/photo-1596204976717-1a9ff47f74ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
]

const MainPage = () => {


    const classes = useStyles();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [destination, setDestination] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/allRooms')
            .then(res => {
                console.log("response from api/rooms")
                console.log(res.data);
                setRooms(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log("error from api/rooms");
                console.log(err);
                setError(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className={classes.root}>
            {/* Search Bar */}
            <SearchBar />


            {/* Recommended Rooms */}
            <div style={{ backgroundColor: "#fff", margin: "3% 0 0 0" }}>
                <Container maxWidth="lg">
                    <Typography variant="h5" align="center" style={{ margin: "2% 0px" }} gutterBottom>
                        Unlock your ideal space with just a few clicks.
                    </Typography>
                    <Grid container spacing={3}>
                        {loading && <div>Loading...</div>}
                        {error && <div>Error: {error.message}</div>}
                        {rooms.map((room) => (
                            <Grid item key={room.id} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        image={room.image ? room.image : photos[Math.floor(Math.random() * photos.length)]}
                                        alt={room.title}
                                        height="200"
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{room.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {room.location}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {room.guests} guests &middot; {room.size} ft
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Host : {room.username}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                            ${room.price}/day
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            color="primary"
                                            variant="contained"
                                            onClick={() => navigate(`/rooms/${room.id}`)}
                                        >
                                            View Details
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>

            {/* Other Sections */}
            <div style={{ backgroundColor: "#ffffff" }}>
                <Container maxWidth="lg">
                    {/* Implementation for other sections here */}
                </Container>
            </div>

            {/* Footer */}
            <div style={{ backgroundColor: "#f7f7f7" }}>
                <Container maxWidth="lg">
                    {/* Footer implementation here */}
                </Container>
            </div>
        </div >
    );
};

axios.defaults.baseURL = 'https://partypad-backend-external.herokuapp.com';

export default MainPage;
