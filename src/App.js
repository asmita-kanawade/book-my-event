import React from 'react';
import 'typeface-roboto';
import './App.css';
import MainAppBar from './AppBar/AppBar';
import SignInSide from './SignIn/SignIn';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShowEvent from './ShowEvent/ShowEvent';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import MyBookings from './MyBookings/MyBookings';
import AddNewEvent from './AddNewEvent/AddNewEvent';
import PublishEvent from './PublishEvent/PublishEvent';
import EditEvent from './EditEvent/EditEvent';
import Bookings from './Bookings/Bookings';
import BookingDetails from './BookingDetails/BookingDetails';


export default class App extends React.Component {

  
  render() {
    
    return (
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/login" exact component={SignInSide}></Route>
              <Route path="/signup" exact component={SignUp}></Route>
              <Route path="/show-event" exact component={ShowEvent}></Route>
              <Route path="/my-bookings" exact component={MyBookings}></Route>
              <Route path="/publish-event" exact component={PublishEvent}></Route>
              <Route path="/add-new-event" exact component={AddNewEvent}></Route>
              <Route path="/edit-event" exact component={EditEvent}></Route>
              <Route path="/all-bookings" exact component={Bookings}></Route>
              <Route path="/booking-details" exact component={BookingDetails}></Route>
              {/* <Route path="/myFavourites" exact component={FavouriteEvents}></Route> */}
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

