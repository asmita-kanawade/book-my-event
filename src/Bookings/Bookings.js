import React, { Component } from 'react';
import Axios from 'axios';
import { Paper } from '@material-ui/core';
import moment from 'moment';
import MainAppBar from '../AppBar/AppBar';
import '../Bookings/Bookings.css';
import { getUniqueEvents, getEventTimings } from '../Services/services';
import {Search} from '../Search/Search';

export default class Bookings extends Component {
  
    state = {
        events: [],
        eventsCopy: [],
        allBookings: []
      }

    componentWillMount() {
        //  Axios.post(`http://localhost:3002/api/search-bookings`)
         Axios.post(`https://book-my-events.herokuapp.com/api/search-bookings`)
             .then(async res => {      
                 let uniqueEvents = await getUniqueEvents(res.data);    
                 this.setState({ events: uniqueEvents });
                 this.setState({ eventsCopy: uniqueEvents });
                 this.setState({ allBookings: res.data });
                 //console.log(`[Bookings.js] events: ${this.state.events.length}`);
             });
 
     }

     redirectToBookingDetails = (eventID) => {
       //console.log("redirecting to details..!");
       
       this.props.history.push({
        pathname:`/booking-details`,
        state: {
          event_id: eventID,
          all_bookings: this.state.allBookings
        }
      });
    }



  // search events handler
  searchEvents = (event) => {
      let searchString = event.target.value;

      let events = [...this.state.eventsCopy];

      let searchResult = events.filter((evnt) => {
          return evnt.title.toLowerCase().includes(searchString.toLowerCase())
              || evnt.city.toLowerCase().includes(searchString.toLowerCase())
              || evnt.category.toLowerCase().includes(searchString.toLowerCase())
              || (evnt.description.about == null ? "" : evnt.description.about).toLowerCase().includes(searchString.toLowerCase())
              || (evnt.description.venue == null ? "" : evnt.description.venue).toLowerCase().includes(searchString.toLowerCase())
              ;
      })

      this.setState({ events: searchResult })
  }

  
  render() {
    return (
     
      <div style={{backgroundColor:"#162447"}}>
         <MainAppBar 
          history={this.props.history}
        />

        <Paper className="total">
          <b>Booked Events</b>
          <div className="search-box">
            <Search
              changed = {(event) => this.searchEvents(event)}
            />
        </div>
        </Paper>
        
       

      <div>
        {this.state.events.map((event, index) => {
          return <div key={index} >
           <Paper className="event-list-paper" elevation={3} onClick={()=>this.redirectToBookingDetails(event.id)} >
          <div className="list"> 
            <div className="event-list-cards">
              <img src={event.imageUrl} className="event-image" /><div 
              className='booked-event-tags-container'>
                <p className='booked-event-tags ttl'>{event.title}</p>
                <p className='booked-event-tags'>{event.city}</p>
                <p className='booked-event-tags'>{getEventTimings(event)}</p>
                <p className='booked-event-tags'>₹ {event.price}</p>
                <b className='booked-event-tags'>Total Bookings: {event.totalBookings}</b>
            </div>
          </div>
         </div>
         </Paper>
          </div>
        })
      }
       </div>
      </div>
    );
  }
}
