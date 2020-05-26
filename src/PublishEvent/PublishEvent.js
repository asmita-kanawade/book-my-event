import React, { Component } from 'react';
import AdminAppBar from '../PublishEvent/AdminAppBar';
import EventsList from '../EventList/EventList';
import { Paper } from '@material-ui/core';
import './PublishEvent.css';

export default class PublishEvent extends Component {
  render() {
    return (
      <div style={{backgroundColor:"#162447", paddingBottom:'10px',paddingTop: '30px', marginTop: '60px'}}>
          <EventsList  history={this.props.history} />
      </div>
    );
  }
}

