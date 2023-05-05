import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";

import React, { useEffect } from "react";
import "./common.scss";
import moment from "moment";



import MainPage from "./form/Partypad/MainPage.js";
import Dashboard from "./form/Partypad/Dashboard";
import Listings from "./form/Partypad/Listings";
import Reservations from "./form/Partypad/Reservations";
import CreateRoomForm from "./form/Partypad/CreateRoomForm";
import UpdateRoomForm from "./form/Partypad/UpdateRoomForm";
import BookingPage from "./form/Partypad/BookingPage";
import Trips from "./form/Partypad/Trips";

function App() {
    //change Date.prototype.toJSON for final submitting
    Date.prototype.toJSON = function () {
        return moment(this).format();
    };



    return (

        <BrowserRouter basename="/partypad_external">
            <Switch>

                {/* my edit - start */}

                <Route exact path="/" component={MainPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/listings" component={Listings} />
                <Route exact path="/reservations" component={Reservations} />
                <Route exact path="/trips" component={Trips} />
                <Route exact path="/createRoomForm" component={CreateRoomForm} />
                <Route exact path="/updateRoomForm/:id" component={UpdateRoomForm} />
                <Route exact path="/rooms/:id" component={BookingPage} />


                {/* my edit - end  */}


            </Switch>
        </BrowserRouter>

    );
}

export default App;
