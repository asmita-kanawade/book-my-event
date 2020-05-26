import moment from "moment";
import axios from 'axios';

//const server_uri = `http://localhost:3002/api/`;
const server_uri = `https://book-my-events.herokuapp.com/api/`;

export const getEvents = async (conditions) => {
    
    let result = await axios({
        method: `POST`,
        url: `${server_uri}search-event`,
        data: conditions
    });
    //console.log(JSON.stringify(result.data));
    return result.data;
}


export const createEvent = async (event) => {
    
    let result = await axios({
        method: `POST`,
        url: `${server_uri}add-event`,
        data: event
    });

    return result.data;
}


export const updateEvent = async (event) => {
    
    let result = await axios({
        method: `POST`,
        url: `${server_uri}update-event`,
        data: event
    });

    return result.data;
}


export const deleteEvent = async (eventID) => {
    
    let result = await axios({
        method: `POST`,
        url: `${server_uri}delete-event`,
        data: {'_id':eventID}
    });

    return result.data;
}


export const getUniqueCategories = async (events) => {
    let uniqueCategories = [];


    const map = new Map();
    for (const event of events) {
        if(!map.has(event.category)){
            map.set(event.category, true);    // set any value to Map
            /*result.push({
                id: item.id,
                name: item.name
            });*/
            uniqueCategories.push(event.category);
        }
    }
   
    console.log(`event categories: ${uniqueCategories}`);
    
    return uniqueCategories;
}



export const getUniqueEvents = async (events) => {
    let uniqueEvents = [];
    let bookingCount = 0;

    const map = new Map();
    for (const event of events) {
        if(!map.has(event.title)){
            map.set(event.title, true);    // set any value to Map
            /*result.push({
                id: item.id,
                name: item.name
            });*/
            event.totalBookings = await getBookingCount(events, event.id);
            uniqueEvents.push(event);
        }
    }
   
    //console.log(`Unique Events: ${JSON.stringify(uniqueEvents)}`);
    
    return uniqueEvents;
}


const getBookingCount = async (events, eventID) => {
    let bookedEvents = events.filter((event, index) => {
        if (event.id === eventID)
            return event;
    });

    //console.log(`[getEventCount] categoryEvents: ${categoryEvents.length}`);
    return bookedEvents.length;
}



export const getEventTimings = (event) => {
    let dateAndTime = '';

    if (event.to_date === event.from_date) {
      // dateAndTime = event.to_date;
      dateAndTime = moment(event.to_date, "YYYYMMDD").format(`MMM Do`);

      if (event.from_time === event.to_time)
        dateAndTime += ' | ' + moment(event.to_time).format(`HH:mm`);
      else
        dateAndTime += ' | ' + moment(event.from_time).format(`HH:mm`) + "-" + moment(event.to_time).format(`HH:mm`);

    }
    else {
      dateAndTime = moment(event.from_date, "YYYYMMDD").format(`MMM Do`) + " to " + moment(event.to_date, "YYYYMMDD").format(`MMM Do`);

      if (event.from_time === event.to_time)
        dateAndTime += ' | ' + moment(event.to_time).format(`HH:mm`);
      else
        dateAndTime += ' | ' + moment(event.from_time).format(`HH:mm`) + "-" + moment(event.to_time).format(`HH:mm`);

    }

    return dateAndTime;
  }
