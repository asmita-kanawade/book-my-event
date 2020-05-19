import React from 'react';
import 'typeface-roboto';
import './App.css';
import SignInSide from './SignIn/SignIn';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ExpandEvent from './ExpandEvent/ExpandEvent';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import BookedEvents from './BookedEvents/BookedEvents';
import AddNewEvent from './AddNewEvent/AddNewEvent';


export default class App extends React.Component {

  render() {
    
    return (
      <div className="App">
        <BrowserRouter>

          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" exact component={SignInSide}></Route>
            <Route path="/signup" exact component={SignUp}></Route>
            <Route path="/displayEvent" exact component={ExpandEvent}></Route>
            <Route path="/myEvents" exact component={BookedEvents}></Route>
            <Route path="/addNewEvent" exact component={AddNewEvent}></Route>
            {/* <Route path="/myFavourites" exact component={FavouriteEvents}></Route> */}
          </Switch>

        </BrowserRouter>

      </div>

    );
  }
}

