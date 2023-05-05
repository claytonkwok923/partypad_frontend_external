import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const MainPage = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    const handleSearch = (destination, checkInDate, checkOutDate) => {
        // handle search logic here
        history.push(`/search?destination=${destination}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);
    };

    return (
        <div>
            {/* Search Bar */}
            <div>
                {/* Search bar implementation here */}
            </div>

            {/* Recommended Rooms */}
            <div>
                <h2>Recommended Rooms</h2>
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error.message}</div>}
                {rooms.map(room => (
                    <div key={room.id}>
                        <img src={room.imageUrl} alt={room.name} />
                        <h3>{room.name}</h3>
                        <p>{room.description}</p>
                        <button onClick={() => history.push(`/room/${room.id}`)}>View Details</button>
                    </div>
                ))}
            </div>

            {/* Other Sections */}
            <div>
                {/* Implementation for other sections here */}
            </div>

            {/* Footer */}
            <div>
                {/* Footer implementation here */}
            </div>
        </div>
    );
};

axios.defaults.baseURL = 'http://localhost:8080';

export default MainPage;
