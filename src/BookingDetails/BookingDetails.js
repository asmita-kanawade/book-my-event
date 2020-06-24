import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getEventTimings } from '../Services/services';
import MainAppBar from '../AppBar/AppBar';
import './BookingDetails.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(event_id, all_bookings) {

  //console.log(`All bookings ${JSON.stringify(all_bookings)}`);
  
 rows = all_bookings.filter((booking) => 
    booking.id===event_id
  )

}

let rows = [];

const useStyles = makeStyles({
  table: {
    maxWidth: '80%',
    alignSelf: 'center',
    margin: 'auto'
  },
});

export default function BookingDetails(props) {
  const [bookingID, setBookingID] = React.useState(props.location.state.event_id);
  const [allBookings, setAllBookings] = React.useState(props.location.state.all_bookings);
    
  
  const classes = useStyles();
  createData(bookingID,allBookings);

  return (
          <div>
          <MainAppBar
            history={props.history} 
          />
        <div id="booking-details" className='event-section'>
          <div className='event-container'>
            <div id='evt-img' className='event-blocks' style={{
              backgroundImage: `url(${rows[0].imageUrl})`
            }}>
              <div
                  id='category-tag' className='tags'><p className='category-text'>{rows[0].category}
                </p></div>

            </div>
            <div id='evt-details' className='event-blocks evt-details'>
              <div id='event-title'><h3 id='event-title-p'><p>{rows[0].title}</p></h3></div>

              <div className='event-details-block'>
                <img src="https://img.icons8.com/offices/2x/date-to.png" className='event-icon' />
                <p id='date-time' className='icon-says'>{getEventTimings(rows[0])} </p>
              </div><div

                className='event-details-block'>
                <img src="https://img.icons8.com/officel/2x/marker.png" className='event-icon' />
                <p className='icon-says'>{rows[0].city}</p>
              </div>
              
              <div
                className='event-details-block'>
                <img src="https://img.icons8.com/offices/2x/rupee.png" className='event-icon' />
                <p className='icon-says'>₹ {rows[0].price}</p>
              </div>
            </div>
          </div>
        </div>
        <Paper elevation={3} className="bookings-paper">
            <h3>Bookings for event : {rows[0].title}</h3>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sr. No.</StyledTableCell>
            <StyledTableCell align="right">Booking Date</StyledTableCell>
            <StyledTableCell align="right">Customer Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Payment ID</StyledTableCell>
            <StyledTableCell align="right">Booking ID</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
               {index+1}
              </StyledTableCell>
              <StyledTableCell align="right"> {row.booking_date}</StyledTableCell>
              <StyledTableCell align="right"> {row.customer.firstname} {row.customer.lastname}</StyledTableCell>
              <StyledTableCell align="right">{row.customer.email}</StyledTableCell>
              <StyledTableCell align="right">{row.payment_id}</StyledTableCell>
              <StyledTableCell align="right">{row._id}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </div>
  );
}
