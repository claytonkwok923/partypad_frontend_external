import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from "@material-ui/core/styles";

import React, { useEffect } from "react";
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


    <Router basename="partypad_external">

      {/* my edit - start */}
      {/* <Route exact path="/" element={<Home />} /> */}
      <Routes>

        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/listings" element={<Listings />} />
        <Route exact path="/reservations" element={<Reservations />} />
        <Route exact path="/trips" element={<Trips />} />
        <Route exact path="/createRoomForm" element={<CreateRoomForm />} />
        <Route exact path="/updateRoomForm/:id" element={<UpdateRoomForm />} />
        <Route exact path="/rooms/:id" element={<BookingPage />} />
      </Routes>


      {/* my edit - end  */}


    </Router>


  );
}

export default App;
