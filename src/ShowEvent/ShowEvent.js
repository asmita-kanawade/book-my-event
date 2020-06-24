import React, { Component } from 'react';
import './ShowEvent.css';
import MainAppBar from '../AppBar/AppBar';

import Axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { getEventTimings } from '../Services/services';
import { CircularProgress, Backdrop } from '@material-ui/core';




function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class ExpandEvent extends Component {
  state = {
    event: null,
    eventId: '',
    bookingError: "",
    open: false
  }

  componentDidMount() {

    const query = new URLSearchParams(this.props.location.search);
    const event_id = query.get('_id');

    this.setState({ eventId: event_id });

    Axios({
      method: "POST",
      url: "https://book-my-events.herokuapp.com/api/search-event",
      data: {
        _id: event_id
      }
    })
      .then(res => {
        //console.log(`[showEvent.js] event: ${JSON.stringify(res.data)}`);
        this.setState({ event: res.data[0] });
      });

  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };


  redirectToMyEvents = () => {
    this.props.history.push({
      pathname: `/my-bookings`
    });
  }

  redirectToHome = () => {
    this.props.history.push({
      pathname: `/`
    });
  }

  getCurrentDate = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'-'+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
   // console.log("todays date "+date +" type "+typeof(date));
    return date;
  }

  openCheckout = async (event) => {

    let token = sessionStorage.getItem('token');

    if (token) {
      let options = {
        "key": "rzp_test_uAcXkABCnOzHHX", // Enter the Key ID generated from the Dashboard
        "amount": this.state.event.price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Asmi Corp",
        "description": "Booking Amount",
        "image": "https://i.ibb.co/qkdw1bN/apple-icon-60x60.png",
        //"order_id": "order_CgmcjRh9ti2lP7", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": (response) => {
          //alert(`Payment ID: ${response.razorpay_payment_id}`);
          //alert(response.razorpay_order_id);
          //alert(response.razorpay_signature);

          console.log(JSON.stringify(response));

          if (response.razorpay_payment_id) {
            this.state.event.payment_id = response.razorpay_payment_id;
            this.state.event.booking_date = this.getCurrentDate();            
            this.bookEvent(this.state.event);
          }

        },
        "prefill": {
          "name": "",
          "email": sessionStorage.getItem('email'),
          "contact": ""
        },
        "notes": {
          "address": ""
        },
        "theme": {
          "color": "#F37254"
        }
      };

      let rzp = new window.Razorpay(options);
      rzp.open();
    }
    else confirmAlert({
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
              pathname: `/show-event`,
              state: { event }
            });
          }
        }
      ]
    });
  }


  bookEvent = (event) => {
    let token = sessionStorage.getItem('token');
    let today =  this.getCurrentDate();

    //  if (token) {

    Axios({
      method: `POST`,
      // url: `http://localhost:3002/book-event`,
      url: `https://book-my-events.herokuapp.com/book-event`,
      data: event,
      headers: {
        authorization: token,
        booking_date:today
      }
    })
      .then(async resp => {
        //console.log(JSON.stringify(resp.data));

        if (resp.data.status === 'success') {
          //console.log("events is booked");
          this.redirectToMyEvents();
        }
        else {
          // setLoginError(resp.data.message);
          this.setState({ openSnack: true });
          this.setState({ bookingError: resp.data.message });
          this.setState({ open: true });
          console.log(`booking error: ${resp.data.message}`);

        }

      });
  }


  render() {
    return (
      <>
      <MainAppBar history={this.props.history} />
      {this.state.event ?
        <>
          <div className='display-event-container'>
            <div className='event-section'>
              <div className='event-container'>
                <div id='evt-img' className='event-blocks' style={{
                  backgroundImage: `url(${this.state.event.imageUrl})`
                  // backgroundImage: `url(${imageUrl})`
                }}>
                  <div
                    id='category-tag' className='tags'><p className='category-text'>{this.state.event.category}
                      {/* </p>id='category-tag' className='tags'><p className='category-text'>{category} */}
                    </p></div>

                </div>
                <div id='evt-details' className='event-blocks'>
                  <div id='event-title'><h3 id='event-title-p'><p>{this.state.event.title}</p></h3></div><div
                    // <div id='event-title'><h3 id='event-title-p'><p>{title}</p></h3></div><div

                    className='event-details-block'>
                    <img src="https://img.icons8.com/offices/2x/date-to.png" className='event-icon' />
                    <p id='date-time' className='icon-says'>{getEventTimings(this.state.event)} </p>
                    {/* <p id='date-time' className='icon-says'>{getEventTimings(time)} </p> */}
                  </div><div

                    className='event-details-block'>
                    <img src="https://img.icons8.com/officel/2x/marker.png" className='event-icon' />
                    <p className='icon-says'>{this.state.event.city}</p>
                    {/* <p className='icon-says'>{city}</p> */}
                  </div>

                  <div
                    className='event-details-block'>
                    <img src="https://img.icons8.com/offices/2x/rupee.png" className='event-icon' />
                    <p className='icon-says'>₹ {this.state.event.price}</p>
                    {/* <p className='icon-says'>₹ {price}</p> */}
                  </div>

                  <div
                    className='event-booking'
                    //onClick={() => { this.bookEvent(this.state.event) }}
                    onClick={() => { this.openCheckout(this.state.event) }}
                  // onClick={() => { this.openCheckout(evt) }}
                  >
                    <p id='book-now'>Book now</p>
                  </div>
                </div>
                <div className="about-event event-section">
                  <h4 className='h4'>About</h4>
                  <p>{this.state.event.description.about}</p>
                  {/* <p>{about}</p> */}

                  <h4 className='h4'>Artist</h4>
                  <p>{this.state.event.artists}</p>
                  {/* <p>{artists}</p> */}

                  <h4 className='h4'>Venue</h4>
                  <p>{this.state.event.description.venue}</p>
                  {/* <p>{venue}</p> */}

                  <h4 className='h4'>Timings</h4>
                  <p>{getEventTimings(this.state.event)} {this.state.event.occurrence === "" || this.state.event.occurrence == "NA" ? "" : ("| " + this.state.event.occurrence)} </p>
                  {/* <p>{getEventTimings(event)} {event.occurrence === "" || event.occurrence=="NA" ? "": ("| "+ event.occurrence)} </p> */}

                  <h4 className='h4'>Terms and conditions</h4>
                  <p>{this.state.event.description.terms}</p>
                  {/* <p>{terms}</p> */}
                </div>
              </div>
            </div>
          </div>

          <div>
            <Snackbar open={this.state.open} autoHideDuration={5000} onClose={this.handleClose}>
              <Alert onClose={this.handleClose} severity="error">
                {this.state.bookingError}
              </Alert>
            </Snackbar>
          </div>
        </> : (
          <Backdrop style={{ color: '#eee' }} open={true} >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        </>
    );
  }
}

export default ExpandEvent;