import React from 'react';
import Axios from "axios";
import FeaturedEvents from '../FeaturedCards/FeaturedCards';
import CategoryTabs from '../Categories/CategoryTabs';
import CarouselComponent from '../Carousel/Carousel';
import PrimarySearchAppBar from '../searchAppBar/searchAppBar';
import TextField from '@material-ui/core/TextField';
import '../Home/Home.css';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import AutoPlayCarousel from '../CarouselItemsForFeaturedEvents/AutoPlayCarousel'


export default class Home extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            events: [],
            isLoggedIn: false
        }
    }

    componentWillMount() {

       // Axios.post(`http://localhost:3002/api/search-event`)
        Axios.post(`https://book-my-events.herokuapp.com/api/search-event`)
            .then(res => {
                this.setState({ events: res.data });
                console.log(`[Home.js] events: ${this.state.events.length}`);
            });

        if (sessionStorage.getItem('token')) {
            this.setState({ isLoggedIn: true })
        }

    }

    render() {
        console.log(this.state.events.length);

        return (

            <div> 

                <PrimarySearchAppBar login={this.state.isLoggedIn} history={this.props.history} />
                {this.state.events.length > 0 ?
                    <div>
                        <div className='carouselContainer'>
                            <CarouselComponent
                                events={this.state.events}
                                history={this.props.history}
                            />
                        </div>
                        <h3 className="heading-featured-events">FEATURED EVENTS</h3>
                        <div className='featured-events-container'>
                                <FeaturedEvents
                                    events={this.state.events}
                                    history={this.props.history} 
                                />
                        </div>
                        <CategoryTabs
                            events={this.state.events}
                            history={this.props.history} />
                    </div>
                    : ""
                }
            </div>
        )
    }
}