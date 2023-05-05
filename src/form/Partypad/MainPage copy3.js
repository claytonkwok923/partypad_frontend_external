import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: '#f7f7f7',
    },
    searchContainer: {
        backgroundColor: 'white',
        padding: theme.spacing(4),
        borderRadius: 16,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderBottom: '3px solid #eee'
    },
    searchButton: {
        borderRadius: '0px 4px 4px 0px',
        height: '100%',
        width: '100%',
        maxWidth: '120px',
    },
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

const MainPage = () => {
    const classes = useStyles();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [destination, setDestination] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const history = useHistory();

    useEffect(() => {
        axios.get('/api/rooms')
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

    const handleSearch = () => {
        // handle search logic here
        history.push(`/search?destination=${destination}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);
    };

    return (
        <div className={classes.root}>
            {/* Search Bar */}
            <Grid container spacing={2} className={classes.searchContainer}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Where are you going?"
                        value={destination}
                        onChange={(event) => setDestination(event.target.value)}
                    />
                </Grid>
                <Grid item xs={6} sm={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Check in"
                        type="date"
                        value={checkInDate}
                        onChange={(event) => setCheckInDate(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Check out"
                        type="date"
                        value={checkOutDate}
                        onChange={(event) => setCheckOutDate(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                {/* Search Button */}
                <Grid item xs={12} sm={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleSearch(destination, checkInDate, checkOutDate)}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>


            {/* Recommended Rooms */}
            <div style={{ backgroundColor: "#fff" }}>
                <Container maxWidth="lg">
                    <Typography variant="h5" align="center" gutterBottom>
                        Hosting a party? Check out our top-rated party rooms.
                    </Typography>
                    <Grid container spacing={3}>
                        {loading && <div>Loading...</div>}
                        {error && <div>Error: {error.message}</div>}
                        {rooms.map((room) => (
                            <Grid item key={room.id} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        image={room.imageUrl}
                                        alt={room.name}
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
                                        <Typography variant="h6" color="primary" gutterBottom>
                                            ${room.price}/day
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={() => history.push(`/room/${room.id}`)}
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

axios.defaults.baseURL = 'http://localhost:8080';

export default MainPage;
