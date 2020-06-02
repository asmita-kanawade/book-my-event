import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { getUniqueCategories } from '../Services/services';
import { Card, Badge } from '@material-ui/core';
import FeaturedEvents from '../FeaturedCards/FeaturedCards';
import CategorisedEvents from '../CategorisedEvents/CategorisedEvents';

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
import '../Categories/Tabs.css';
import Paper from '@material-ui/core/Paper';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    color: {
        backgroundColor: '#00a1ab'
    }
}));

export default class CategoryTabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            events: [...props.events],
            uniqueCategories: [],
            eventsCopy: [...props.events]
        }
    }

    async componentDidMount() {
        let uniqueCategories = await getUniqueCategories(this.state.events);
        this.setState({ uniqueCategories });
        
              
    }


    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
    };

    // search events handler
    searchEvents = (event) => {
        let searchString = event.target.value;

        let events = [...this.state.eventsCopy];

        let searchResult = events.filter((evnt) => {
            return evnt.title.toLowerCase().includes(searchString.toLowerCase())
                || evnt.city.toLowerCase().includes(searchString.toLowerCase())
                || evnt.category.toLowerCase().includes(searchString.toLowerCase())
                || (evnt.description.about == null ? "" : evnt.description.about).toLowerCase().includes(searchString.toLowerCase())
                || (evnt.description.venue == null ? "" : evnt.description.venue).toLowerCase().includes(searchString.toLowerCase())
                ;
        })

        this.setState({ events: searchResult })
    }


    getEventCount = (category) => {
        let events = [...this.state.events];

        let categoryEvents = events.filter((event, index) => {
            if (event.category === category)
                return event;
        });

        //console.log(`[getEventCount] categoryEvents: ${categoryEvents.length}`);
        return categoryEvents.length;
    }

    render() {
        return (
            <>
             <div className="genre">
                    <h3 className="heading-genre">BROWSE EVENTS BY GENRE</h3><div 
                    className="search-container">
                        <TextField
                            InputProps={{
                                startAdornment: (
                                        <IconButton className="icon-btn">
                                            <SearchIcon />
                                        </IconButton>
                                )
                            }}
                            placeholder="Search"
                             onChange={(event) => this.searchEvents(event)}
                            className="search"
                        />
                    </div>
                </div>
                <Paper
                elevation={3}
                className="paper-categories">

                <div style={{
                    flexGrow: 1
                }}>
                    <AppBar
                        style={{
                            backgroundColor: "crimson",
                            position: "static",
                            color: "white"
                        }}
                    >


                        <Tabs
                            // orientation="vertical"
                            variant="scrollable"
                            className="search-field"
                            value={this.state.value}
                            onChange={this.handleChange}
                            aria-label="simple tabs example">
                            {/* <div className="search-container">
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                                <IconButton className="icon-btn">
                                                    <SearchIcon />
                                                </IconButton>
                                        )
                                    }}
                                    placeholder="Search"
                                    onChange={(event) => this.searchEvents(event)}
                                    className="search"
                                />
                            </div> */}

                            {
                                this.state.uniqueCategories.map((category, index) => {
                                    return (
                                        //<Tab label={category} {...a11yProps(index)} />
                                        <Tab label={category + `(${this.getEventCount(category)})`} {...a11yProps(index)} />
                                    )
                                })
                            }

                        </Tabs>
                    </AppBar>
                   
                    {
                        this.state.uniqueCategories.map((category, index) => (
                           
                            <TabPanel value={this.state.value} index={index} style={{
                                backgroundColor: "white",
                                borderBottom: "1px solid grey",
                                paddingBottom: '25px'
                            }}>
                                {
                                    <CategorisedEvents
                                        events={this.state.events} category={category}
                                        history={this.props.history} >
                                    </CategorisedEvents>

                                }

                            </TabPanel>
                            )
                        )
                    }
                   
                </div>
            </Paper>
            </>
        );
    }

}
