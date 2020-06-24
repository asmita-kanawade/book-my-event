import React from 'react';
import axios from 'axios';
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
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import '../EditEvent/EditEvent.css';
import MainAppBar from '../AppBar/AppBar';

export default class EditEvent extends React.Component {
    constructor(props) {
        super(props);

        const event = props.location.state;
          
        this.state = {
            id: event._id,
            title: event.title,
            city:event.city,
            category:event.category,
            from_date:event.from_date,
            to_date:event.to_date,
            from_time:event.from_time,
            to_time:event.to_time,
            occurrence:event.occurrence,
            price:event.price,
            imageUrl:event.imageUrl,
            showInBanner:event.showInBanner,
            isFeatured:event.isFeatured,
            artists:event.artists,
            about:event.description.about,
            venue:event.description.venue,
            terms:event.description.terms,
        };
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


    redirectToHome =  (event) => {
        //console.log event);
          this.props.history.push({
          pathname:`/`,
         event
        });
      }

    TextFieldSubmitHandler = (event) => {
        event.preventDefault();
        //  let titleErr = '';
        //  let bodyErr = '';
       
        // let title = this.state.title;
        
        // if (title === null || title.length === 0) {
        //     titleErr = <strong>Please enter title</strong>;
        // }
        // this.setState({titleerrormessage: titleErr});

        // let body = this.state.body;
        
        // if (body === null || body.length === 0) {
        //     bodyErr = <strong>Please enter the content</strong>;
        // }

        // this.setState({bodyerrormessage: bodyErr});

        // if(titleErr.length == 0 && bodyErr.length == 0)
        // {
            this.updateEvent({
                _id: this.state.id,
                title: this.state.title,
                city:this.state.city,
                category:this.state.category,
                from_date:this.state.from_date,
                to_date:this.state.to_date,
                from_time:this.state.from_time,
                to_time:this.state.to_time,
                occurrence:this.state.occurrence,
                price:this.state.price,
                imageUrl:this.state.imageUrl,
                showInBanner:this.state.showInBanner,
                isFeatured:this.state.isFeatured,
                artists:this.state.artists,
                about:this.state.about,
                venue:this.state.venue,
                terms:this.state.terms,

               
            });
    
        // }
    
    }
        
    TextFieldChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        
        this.setState({ 
            [nam]: val 
        });
        
    }

    redirectToEventsList = () => {
        this.props.history.push({
            pathname:`/publish-event`
          });
    }
    
    handleSwitchChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    };
   
    updateEvent = (event)=>{
        console.log(`server: ${process.env.SERVER_URL}`);
            
        axios({
             // url: `http://localhost:3002/update-event`,
             url: `https://book-my-events.herokuapp.com/update-event`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify (event),
          }).then(response => {
              this.redirectToEventsList();
            //console.log(`response: ${JSON.stringify(response)}`);
            // this.props.history.push(`/post/${this.props.match.params.id}`);
          }).catch(error => {
            console.log(`update post error: ${error}`);
          });
    
    }
    
    render() {
        return (
            <div>
            {/* <AdminAppBar history={this.props.history}/> */}
            <MainAppBar history={this.props.history} />
            <div className='edit-container' id="editEvent">
             <form
                onSubmit={this.TextFieldSubmitHandler}
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
                <h3 className="heading-edit">Edit Event</h3>
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
                            value={this.state.title}
                            onChange={this.TextFieldChangeHandler}
                            onfocusout={this.validatetitle}
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
                            value={this.state.city}
                            onChange={this.TextFieldChangeHandler}
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
                            value={this.state.venue}
                            onChange={this.TextFieldChangeHandler}
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
                            value={this.state.category}
                            onChange={this.TextFieldChangeHandler}
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
                            value={this.state.artists}
                            onChange={this.TextFieldChangeHandler}
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
                            value={this.state.occurrence}
                            onChange={this.TextFieldChangeHandler}
                            style={{
                                width:'60%'
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            type="number"
                            InputProps={{ inputProps: { min: 0} }}
                            id="outlined-basic"
                            name="price"
                            label="Price"
                            variant="outlined"
                            value={this.state.price}
                            onChange={this.TextFieldChangeHandler}
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
                            label="ImageUrl"
                            variant="outlined"
                            value={this.state.imageUrl}
                            onChange={this.TextFieldChangeHandler}
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
                            value={this.state.about}
                            onChange={this.TextFieldChangeHandler}
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
                            value={this.state.terms}
                            onChange={this.TextFieldChangeHandler}
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
                    Update
                    </Button>
                    <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<CancelIcon />}
                    onClick={this.redirectToEventsList}
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
            </div>
        );
    }
}
