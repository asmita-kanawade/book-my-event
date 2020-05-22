import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';
import '../FeaturedCards/FeaturedCard.css'


let value = false;

const handleChange = (element) => {
  value = !value;
  console.log(`value is ${element}`);
  //  if(!value){
  //   element.style.display='block'
  //  }
  //  else
  //  element.style.display='none'
}

export default class FeaturedEvents extends React.Component {
  constructor(props) {

    super(props);
    this.addActiveClass = this.addActiveClass.bind(this);
    //console.log("[FeaturedCard.js] " + JSON.stringify(props));
    this.myRef = React.createRef();
    this.state = {
      events: [...props.events],
      isShownBuy: false,
    }

  }

  componentWillMount() {
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

      <div style={{
        marginTop: '0px',
        padding: 0,
        margin: 0,
        // backgroundColor: '#00a1ab'
      }}
        onMouseEnter={() => {
          this.setState({ isShownBuy: true });
          //console.log("hovered..!");
        }}
        onMouseLeave={() => {
          this.setState({ isShownBuy: false });
         // console.log("overed..!");
        }}
      >
         <div container spacing={8} justify="center" className="featured-event-container" ref={this.myRef}>
          {this.state.events.map((event, index) => {
            if (event.isFeatured)
              return (
                  <Card
                  className="event-card"
                  item key={index}
                    onClick={() => redirectToDisplayEvent(event)}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={event.imageUrl}
                        title={event.title}
                      />
                     
                      <CardContent className="card-details">
                        <Typography className="card-content title"><b>{event.title}</b></Typography>
                        <Typography className="card-content">{this.getEventTimings(event)}</Typography>
                        <Typography className="card-content">{event.city}</Typography>
                        <Typography className="card-content">₹ {event.price}</Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions style={{ position: 'relative' }}>
                      {/* <FavoriteBorderIcon className="favUnfilledIcon" size="small" onClick={(e) => handleChange(e)}>
                      </FavoriteBorderIcon>
                      <FavoriteIcon className="favFilledIcon" size="small" onClick={this.addActiveClass.bind(index)} /> */}
                    </CardActions>
                  </Card>
                  
              )
          })}
        </div>
      </div>

    );
  }

}
