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

import Flicking from "@egjs/react-flicking";
import { Fade, AutoPlay } from "@egjs/flicking-plugins";
import "./plugins.css";
import zIndex from '@material-ui/core/styles/zIndex';



export default class CarouselComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        
        //console.log(`[Carousel.js] events: ${JSON.stringify(props.events)}`);
        //console.log(`[Carousel.js] props.history: ${JSON.stringify(props.history)}`);

        this.state = {
            events: props.events,

            plugins : [new Fade(), new AutoPlay(2000, "NEXT")]
        }

    }


    redirectToEvent = (item) => {
        //console.log(`redirectToEvent-item: ${JSON.stringify(item)}`);
        this.props.history.push({
            pathname:`/displayEvent`,
            state: {event: item}
        });
    }
    
    render()
    {
        return (
            <div style={{marginTop: "75px", zIndex:2}}>

                <Flicking
                    className="flicking"
                    circular={true}
                    gap={10}
                    duration={500}
                    plugins={this.state.plugins}
                    style={{
                        width:"100%",
                        margin: "auto",
                        paddingTop:"50px"
                    }}
                    >
                    {
                        this.state.events.map( (event, index) => {
                            if(event.showInBanner)
                                return <div className="panel" style={{ width: "50%"}}
                                            onClick={()=>this.redirectToEvent(event)}>
                                            <img 
                                                src={event.imageUrl} 
                                                style={{height:"300px" ,width:"90%"}}
                                            />
                                        </div>
                        })
                    }

                </Flicking>

            </div>

        )
    }
}