import React, { Component } from 'react';
import '../ExpandEvent/ExpandEvent.css'
import PrimarySearchAppBar from '../searchAppBar/searchAppBar';
import moment from 'moment';
import { Link } from 'react-router-dom';
import BookedEvents from '../BookedEvents/BookedEvents';
import Axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { IconButton } from '@material-ui/core';

class ExpandEvent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      event: props.location.state.event,
    }

  }


  bookEvent = (event) => {

    let token = sessionStorage.getItem('token');

    if (token) {
      Axios({
        method: `POST`,
        url: `http://localhost:3002/book-event`,
        data: event,
        headers: {
          authorization: token
        }
      })
        .then(resp => {
          console.log(JSON.stringify(resp.data));


          if (resp.data.status === 'success') {
            console.log("events is booked");

            // sessionStorage.setItem('token', resp.data.auth_token);
            // sessionStorage.setItem('email', resp.data.email);

            this.props.history.push({
              pathname: `/myEvents`,
              state: { event }
            });

          }
          else {
            // setLoginError(resp.data.message);
            this.setState({ openSnack: true });
            console.log("error");

          }    
    
        });

    }
    else {
     
      // confirmAlert(this.state.options); 
      confirmAlert({
        title: 'To book this event you should login first',
        message: 'Do you want to login Now?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              this.props.history.push({
                pathname: `/login`,
                state: { event }
              });
            }
          },
          {
            label: 'No',
            onClick: () => {
              this.props.history.push({
                pathname: `/displayEvent`,
                state: { event }
              });
            }
          }
        ]
      });
    }
  }

  getEventTimings = (event) => {
    let dateAndTime = '';

    if (event.to_date === event.from_date) {
      // dateAndTime = event.to_date;
      dateAndTime = moment(event.to_date, "YYYYMMDD").format(`MMM Do`);

      if (event.from_time === event.to_time)
        dateAndTime += ' | ' + moment(event.to_time, "HHmmss").format(`HH:mm`);
      else
        dateAndTime += ' | ' + moment(event.from_time, "HHmmss").format(`HH:mm`) + "-" + moment(event.to_time, "HHmmss").format(`HH:mm`);

    }
    else {
      dateAndTime = moment(event.from_date, "YYYYMMDD").format(`MMM Do`) + " to " + moment(event.to_date, "YYYYMMDD").format(`MMM Do`);

      if (event.from_time === event.to_time)
        dateAndTime += ' | ' + moment(event.to_time, "HHmmss").format(`HH:mm`);
      else
        dateAndTime += ' | ' + moment(event.from_time, "HHmmss").format(`HH:mm`) + "-" + moment(event.to_time, "HHmmss").format(`HH:mm`);

    }

    return dateAndTime;
  }


  render() {

    return (
      <div className='display-event-container'>
        <PrimarySearchAppBar login={sessionStorage.getItem('token') ? true : false} history={this.props.history}/>
       
        <h1><p className='h1-title'>{this.state.event.title}</p></h1>

        <div className='event-section'>
          <div className='event-container'>
            <div id='evt-img' className='event-blocks' style={{
              backgroundImage: `url(${this.state.event.imageUrl})`
            }}>
              <div id='price-tag' className='tags'><p
                className='category-text'>₹ {this.state.event.price}</p></div><div
                  id='category-tag' className='tags'><p className='category-text'>{this.state.event.category}
                </p></div><div
                  id='title-tag' className='tags'>{this.state.event.title}</div>

            </div>
            <div id='evt-details' className='event-blocks'>
              <div id='event-title'><h3 id='event-title-p'><p>{this.state.event.title}: {this.state.event.description.venue}</p></h3></div><div

                className='event-details-block'>
                <img src="https://img.icons8.com/offices/2x/date-to.png" className='event-icon' />
                <p id='date-time' className='icon-says'>{this.getEventTimings(this.state.event)} </p>
              </div><div

                className='event-details-block'>
                <img src="https://img.icons8.com/officel/2x/marker.png" className='event-icon' />
                <p className='icon-says'>{this.state.event.city}</p>
              </div>
              
              <div
                className='event-details-block'>
                <img src="https://img.icons8.com/offices/2x/rupee.png" className='event-icon' />
                <p className='icon-says'>₹ {this.state.event.price}</p>
              </div>

              <div

                className='event-booking'
                onClick={() => { this.bookEvent(this.state.event) }}
                >
                <p id='book-now'>Book now</p>
              </div>{/* <div
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}'/fav-icon.jpg')`
                }} className='fav-icon'> </div> */}
            </div>
          </div>
        </div>

        <div className="about-event event-section">
          <h4 className='h4'>About</h4>
          <p>{this.state.event.description.about}</p>

          <h4 className='h4'>Venue</h4>
          <p>{this.state.event.description.venue}</p>

          <h4 className='h4'>Terms and conditions</h4>
          <p>{this.state.event.description.terms}</p>
        </div>

      </div>
    );
  }
}

export default ExpandEvent;