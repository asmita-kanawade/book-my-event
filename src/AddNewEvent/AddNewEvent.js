import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import Switch from '@material-ui/core/Switch';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import '../AddNewEvent/AddNewEvent.css';
import Paper from '@material-ui/core/Paper';
import MainAppBar from '../AppBar/AppBar';
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';

class AddNewEvent extends Component {
    constructor(props) {

        super(props);
        this.saveEvent = this.saveEvent.bind(this);
        this.state = {
            isFeatured: true,
            showInBanner: true,
            from_date: moment().format('YYYYMMDD'),
            to_date: moment().format('YYYYMMDD'),
            from_time: moment(),
            to_time: moment(),
        }
    }

    handleStartDateChange = (date) => {
        //alert('from_date: '+ date.format('YYYYMMDD'));
        this.setState({ from_date: date.format('YYYYMMDD') });
        //this.setState({ from_time: date.format('HHmmss') });
    };

    handleEndDateChange = (date) => {
        this.setState({ to_date: date.format('YYYYMMDD') });
       // this.setState({ to_time: date.format('HHmmss') });
    };
    handleStartTimeChange = (date) => {
        //alert('from_time: '+ date);
        //this.setState({ from_time: date.format('HH:mm') });
        this.setState({ from_time: date});
    };

    handleEndTimeChange = (date) => {
        //this.setState({ to_time: date.format('HH:mm') });
        this.setState({ to_time: date });
    };

    handleSwitchChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    };


    handleTextFieldChange = (event) => {
        //alert([event.target.name] + ' -> ' + event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    };

    redirectToPublishEvent = () => {
    this.props.history.push({
        pathname:`/publish-event`
      });
    }

    // save the event data
    saveEvent = (evt) => {
        console.log("got clicked by save event");
        
        evt.preventDefault();
        let token = sessionStorage.getItem('token');

        let event = {
            title: this.state.title,
            city: this.state.city,
            category: this.state.category,
            from_date: this.state.from_date,
            to_date: this.state.to_date,
            from_time: this.state.from_time,
            to_time: this.state.to_time,
            occurrence: this.state.occurrence,
            price: this.state.price,
            favourites_count: this.state.favourites_count,
            imageUrl: this.state.imageUrl,
            showInBanner: this.state.showInBanner,
            isFeatured: this.state.isFeatured,
            artists: this.state.artists,
            description: {
                about: this.state.about,
                venue: this.state.venue,
                terms: this.state.terms
            }
        };

        //console.log(`[saveEvent] event: ${JSON.stringify(event)}`);

        Axios({
            method: `POST`,
           // url: `http://localhost:3002/add-event`,
            url: `https://book-my-events.herokuapp.com/add-event`,
            data: event,
            headers: {
                authorization: token
            }
        })
            .then(resp => {
                console.log("Add event: "+JSON.stringify(resp.data));
                if (resp.data.status === 'success') {
                    this.redirectToPublishEvent();

                }
                else {
                    // setLoginError(resp.data.message);
                    this.setState({ openSnack: true });

                    console.log(`[AddNewEvent.js] error in adding event: ${resp.data.message}`);
                }
            });

    }

    render() {
        return (
            <div className="form-container-addNew">
                 <MainAppBar history={this.props.history} />
            <form
                onSubmit={this.saveEvent}
                style={{
                    root: {
                        '& > *': {
                            width: '25ch',
                        },

                    }
                }}
                autoComplete="off"
            >
                <Paper  className="form-container">
                <h3 className="heading-addNew">Add New Event</h3>
                <Grid container spacing={3} style={{
                    margin:"20px"
                }}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="outlined-basic"
                            name="title"
                            label="Title"
                            variant="outlined"
                            onChange={this.handleTextFieldChange}
                            style={{
                                width:'80%'
                            }}

                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="outlined-basic"
                            name="city"
                            label="City"
                            variant="outlined"
                            onChange={this.handleTextFieldChange}
                            style={{
                                width:'60%'
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="outlined-basic"
                            name="venue"
                            label="Venue"
                            variant="outlined"
                            onChange={this.handleTextFieldChange}
                            style={{
                                width:'60%'
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="outlined-basic"
                            name="category"
                            label="Category"
                            variant="outlined"
                            onChange={this.handleTextFieldChange}
                            style={{
                                width:'60%'
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            required
                            id="outlined-basic"
                            name="artists"
                            label="Artist"
                            variant="outlined"
                            onChange={this.handleTextFieldChange}
                            style={{
                                width:'60%'
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-basic"
                            name="occurrence"
                            label="Occurance"
                            variant="outlined"
                            onChange={this.handleTextFieldChange}
                            style={{
                                width:'60%'
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="outlined-basic"
                            name="price"
                            label="Price"
                            variant="outlined"
                            onChange={this.handleTextFieldChange}
                            style={{
                                width:'60%'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="outlined-basic"
                            name="imageUrl"
                            label="Image Url"
                            variant="outlined"
                            onChange={this.handleTextFieldChange}
                            style={{
                                width:'80%'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        
                        <label style={{
                                marginRight:"195px",
                                width:'200px'
                            }}>Is this event featured?
                        </label>
                        <Switch
                                checked={this.state.isFeatured}
                                onChange={this.handleSwitchChange}
                                name="isFeatured"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <label style={{
                                marginRight:"50px",
                            }}> Do you want to show this event in Banner?
                        </label>
                        <Switch
                                checked={this.state.showInBanner}
                                onChange={this.handleSwitchChange}
                                color="primary"
                                name="showInBanner"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                    </Grid>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid item xs={6}>
                    <KeyboardDatePicker
                            required
                            name="from_date"
                            margin="normal"
                            id="from-date-picker"
                            label="From Date"
                            format="DD/MM/yyyy"
                            value={this.state.from_date}
                            onChange={(date) => this.handleStartDateChange(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            style={{
                                width:'60%'
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <KeyboardDatePicker 
                            required
                            name="to_date"
                            margin="normal"
                            id="to-date-picker"
                            label="To Date"
                            format="DD/MM/yyyy"
                            value={this.state.to_date}
                            onChange={(date) => this.handleEndDateChange(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            style={{
                                width:'60%'
                            }}
                        />
                    </Grid>
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid item xs={6}>
                    <KeyboardTimePicker
                            required
                            name="from_time"
                            margin="normal"
                            id="from-time-picker"
                            label="From Time"
                            format="HH:mm"
                            ampm={false}
                            value={this.state.from_time}
                            onChange={(date) => this.handleStartTimeChange(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            style={{
                                width:'60%'
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <KeyboardTimePicker
                            required
                            name="to_time"
                            margin="normal"
                            id="to-time-picker"
                            label="To Time"
                            format="HH:mm"
                            ampm={false}
                            value={this.state.to_time}
                            onChange={(date) => this.handleEndTimeChange(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            style={{
                                width:'60%',
                            }}
                        /> 
                    </Grid>
                    </MuiPickersUtilsProvider>
                   
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="standard-multiline-static"
                            name="about"
                            label="About event"
                            multiline
                            rows={4}
                            defaultValue=""
                            onChange={this.handleTextFieldChange}
                            style={{
                                width:'80%'
                            }}
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="standard-multiline-static"
                            name="terms"
                            label="Terms and conditions"
                            multiline
                            rows={4}
                            defaultValue=""
                            onChange={this.handleTextFieldChange}
                            style={{
                                width:'80%'
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            //onClick={this.saveEvent}
                            type = "submit"
                        >
                         Save
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<CancelIcon />}
                            onClick={this.redirectToPublishEvent}
                            style={{
                                margin:"5px"
                            }}
                        >
                            Cancel
                        </Button> 
                    </Grid>
                </Grid>
               
                </Paper>
            </form >
            </div>
        );
    }
}

export default AddNewEvent;