import React from 'react';
import range from 'lodash/range';
import styled from 'styled-components';
import ItemsCarousel from '../../src/ItemsCarousel';
import FeaturedEvents from '../FeaturedCards/FeaturedCards';
import Axios from 'axios';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Grid, Typography } from "@material-ui/core";
import '../FeaturedCards/FeaturedCard.css';
import moment from 'moment';


const noOfItems = 12;
const noOfCards = 3;
const autoPlayDelay = 2000;
const chevronWidth = 100;

const Wrapper = styled.div`
  padding: 0 ${chevronWidth}px;
  max-width: 80%;
  width: 80%;
  margin: 0 auto;
  height: 300px;
`;

const SlideItem = styled.div`
   height: 100%;
   width: 100%;
  margin-top: 10px;
  background: white;
  //display: inline-flex;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;


export default class AutoPlayCarousel extends React.Component {

  state = {
    events: [...this.props.events],
    isLoggedIn: false,
    activeItemIndex: 0,
  }

  carouselItems =  this.state.events.map((event, index) => {
    if (event.isFeatured)
      return (

        <SlideItem key={index} className="sld-item">
          <div className="inside-SlideItem">
            <div container spacing={8} justify="center" className="featured-event-container">
              <Card
                className="event-card"
                item key={index}
                onClick={() => this.redirectToDisplayEvent(event)}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={event.imageUrl}
                    title={event.title}
                  />

                  <CardContent className="card-details">
                    <Typography id="event-title" className="card-content title"><b>{event.title}</b></Typography>
                    {/* <Typography className="card-content">{this.getEventTimings(event)}</Typography> */}
                    <Typography className="card-content">{event.city}</Typography>
                    <Typography className="card-content">₹ {event.price}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </div>
        </SlideItem>
       
      )
  });

  componentDidMount() {
    this.interval = setInterval(this.tick, autoPlayDelay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  redirectToDisplayEvent = (event) => {
    this.props.history.push({
      pathname: `/displayEvent`,
      state: { event: event }
    });
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

  tick = () => this.setState(prevState => ({
    activeItemIndex: (prevState.activeItemIndex + 1) % (noOfItems - noOfCards + 1),
  }));

  onChange = value => this.setState({ activeItemIndex: value });

  render() {
    return (
      <Wrapper>
        <ItemsCarousel
        className="item-carousel"
          gutter={12}
          numberOfCards={noOfCards}
          activeItemIndex={this.state.activeItemIndex}
          requestToChangeActive={this.onChange}
          rightChevron={<button>{'>'}</button>}
          leftChevron={<button>{'<'}</button>}
          chevronWidth={chevronWidth}
          outsideChevron
          // children={carouselItems(this.state.events)}
          children={this.carouselItems}
        />
      </Wrapper>
    );
  }
}
