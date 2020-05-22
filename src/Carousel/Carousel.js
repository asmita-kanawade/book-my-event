import React from 'react';
import Carousel from 'react-material-ui-carousel';
import autoBind from 'auto-bind';
import './Carousel.css';
import {
    FormLabel,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    Paper,
    Button,
    Slider,
    Typography
} from '@material-ui/core'
import { getEvents } from '../Services/services';


function Project(props)
{
    const redirectToEvent = (item) => {
        //console.log(`redirectToEvent-item: ${JSON.stringify(item)}`);
        props.history.push({
            pathname:`/displayEvent`,
            state: {event: item}
        });
    }
      
    return (
        <Paper 
            className="Project"
            style={{
                backgroundImage: `url(${props.item.imageUrl})`,
                backgroundRepeat:'no-repeat',
                backgroundSize: '100% 100%',
                width: '70%',
                height: '300px',
                margin:'0 auto',
                fontWeight:'bold',
                position: 'relative',
                top: '50px',
                cursor:"pointer"
            }}
            elevation={10}
            onClick={()=>redirectToEvent(props.item)}
        >
            {/* <h2 className='CarouselContent'>{props.item.title}</h2> */}
            {/* <Button className="CheckButton" style={{
               color:'white',
               backgroundColor:'dodgerblue',
               position:'relative',
               top: '110px'
            }}
            onClick={()=>redirectToEvent(props.item)}>
                Check it out!
            </Button> */}
            {/* <p  className='CarouselContent' style={{
               color:'white',
               backgroundColor:'dodgerblue',
               position:'absolute',
               top: '203px',
               width: '100px',
               opacity:1
            }}>₹ {props.item.price}</p> */}

        </Paper>
    )
}




export default class CarouselComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        
        //console.log(`[Carousel.js] events: ${JSON.stringify(props.events)}`);
        //console.log(`[Carousel.js] props.history: ${JSON.stringify(props.history)}`);

        this.state = {
            autoPlay: false,
            timer: 200,
            animation: "slide",
            indicators: false,
            timeout: 200,
            events: props.events
        }

        autoBind(this);
    }

    
    
    render()
    {
        return (
            <div style={{marginTop: "50px", color: "#494949"}}>

                <Carousel 
                    className="SecondExample"
                    autoPlay={this.state.autoPlay}
                    timer={this.state.timer}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                    timeout={this.state.timeout}
                >
                    {
                        this.state.events.map( (event, index) => {
                            if(event.showInBanner)
                                return <Project item={event} key={index} history= {this.props.history}/>
                        })
                    }
                </Carousel>
            </div>

        )
    }
}