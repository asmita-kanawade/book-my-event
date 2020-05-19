import React from "react";
import ReactDOM from "react-dom";
import { Grid, Paper, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';
import '../FeaturedCards/FeaturedCard.css'


export default class BookedEventCards extends React.Component {
  constructor(props) {

    super(props);
    this.addActiveClass = this.addActiveClass.bind(this);
    //console.log("[FeaturedCard.js] " + JSON.stringify(props));

    this.state = {
      events: [...props.event],
    }

  }

  
  addActiveClass(index) {
    //  document.getElementById(''`${index}`).style.display='none';
    console.log("index" + index);

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
    //console.log('see what events contain' + JSON.stringify(this.state.events));
    const redirectToDisplayEvent = (event) => {
      this.props.history.push({
        pathname: `/displayEvent`,
        state: { event: event }
      });
    }

    return (
<>
      <div style={{
        marginTop: '0px',
        padding: 0,
        margin: 0,
        // backgroundColor: '#00a1ab'
      }}
        
      >

        <Grid container spacing={8} justify="center" style={{
          marginTop: '0px'
        }}>
          {this.state.events.map((event, index) => {
              return (
                  
                <Grid item key={index}>
                  <Card style={{
                    width: '300px'
                  }}
                    onClick={() => redirectToDisplayEvent(event)}>
                    <CardActionArea>
                        <h1>{event.title}</h1>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={event.imageUrl}
                        title={event.title}
                      />
                      <div className='title'>{event.title}</div>
                      <CardContent>
                        <Typography className="card-content">{this.getEventTimings(event)}</Typography>
                        <Typography className="card-content">{event.city}</Typography>
                        <Typography className="card-content">₹ {event.price}</Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions style={{ position: 'relative' }}>
                      </CardActions>
                  </Card>
                </Grid>
              )
          })}
        </Grid>
        <div>Hiii</div>
      </div>
</>
    );
  }

}
