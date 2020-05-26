import React, { Component } from 'react';
import AdminAppBar from '../PublishEvent/AdminAppBar';
import EventsList from '../EventList/EventList';
import { Paper } from '@material-ui/core';
import './PublishEvent.css';

export default class PublishEvent extends Component {
  render() {
    return (
      <div style={{backgroundColor:"#162447"}}>
{/*           <AdminAppBar history={this.props.history} />
          <Paper className="heading-event-list">
            <b>List of Published Events</b>
          </Paper>
 */}          <EventsList  history={this.props.history} />
      </div>
    );
  }
}

