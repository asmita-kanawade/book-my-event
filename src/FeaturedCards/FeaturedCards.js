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

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {getEventTimings} from '../Services/services';

export default class FeaturedEvents extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      events: [...props.events]
    }

  }



    redirectToDisplayEvent = (event) => {
      this.props.history.push({
        pathname: `/show-event`,
        state: { event: event }
      });
    }
  
  render() {


    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1 // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
    };    

    return (

      <div style={{width:"80%", margin:"auto"}}>

        <Carousel
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={this.props.deviceType !== "mobile" ? false : false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >

        {
            this.state.events.map( (event, index) => {
                if(event.isFeatured)
                    return <div >
                          <Card style={{
                            width: '250px',
                            margin: '5px',
                            height: "300px"
                          }}
                            onClick={() =>this.redirectToDisplayEvent(event)}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={event.imageUrl}
                                title={event.title}
                              />
                             
                              <CardContent>

                        <Typography className="card-content title">{event.title.length >=40 ?event.title.substring(0, 40)+ "..." : event.title.substring(0, event.title.length)}</Typography>
                                <Typography className="card-content">{getEventTimings(event)}</Typography>
                                <Typography className="card-content">{event.city}</Typography>
                                <Typography className="card-content">₹ {event.price}</Typography>
                              </CardContent>
                            </CardActionArea>
                            
                          </Card>

                  </div>
              })
          }

        </Carousel>
      </div>

    );
  }

}
