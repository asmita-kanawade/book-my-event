import React, { Component } from 'react';

export default class HeaderAppBar extends Component {
  render() {
    return (
      <div className="header-container">
          <div className="appbar-name">Book My Event</div><div className="appbar-links">

            {/* If user is at /home hide Home button */}
            {
                pathname === "/" ? 
                <></> : 
                <Link to="/" className={classes.links} variant="h6">Home</Link>
            }

            {/* If user is at /home and not logged in, show signup & login buttons  */}
            {
                pathname === "/" && !isLoggedIn? 
                <>
                    <Link to="/login" className={classes.links}>Login</Link>
                    <Link to="/signup" className={classes.links}>SignUp</Link>
                </> : 
                <></>
            }  

               {/* If user is logged in  and at home page */}
               {pathname === "/" && isLoggedIn? 
              <>
                <Link to="/myEvents" className={classes.links} variant="h6">My Events</Link>
                <Link className={classes.links} variant="h6" onClick={handlePublishEvent}>Publish event</Link>
                <Link to="/" className={classes.links} variant="h6" onClick={logOut}>
                    <IconButton
                    edge="end"
                    aria-label="logout"
                    // aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                    >
                        <PowerSettingsNewIcon />
                    </IconButton>
                </Link>
              </> : 
              <></>}  

              {/* If user at /myEvents or /addNewEvent page, hide login and signup buttons */}
                {pathname === "/myEvents" || pathname === "/addNewEvent" ? 
                <>
                  <Link to="/" className={classes.links} variant="h6" onClick={logOut}>
                    <IconButton
                      edge="end"
                      aria-label="logout"
                      // aria-controls={menuId}
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <PowerSettingsNewIcon />
                    </IconButton>
                  </Link>
                </>: 
                <></>
              }

              {/* If user at /displayEvents, hide login and signup buttons */}
              {pathname === "/displayEvent" && isLoggedIn ? 
                <>
                <Link to="/myEvents" className={classes.links} variant="h6">My events</Link>
                <Link className={classes.links} variant="h6" onClick={handlePublishEvent}>Publish event</Link>
                <Link to="/" className={classes.links} variant="h6" onClick={logOut}>
                    <IconButton
                      edge="end"
                      aria-label="logout"
                      // aria-controls={menuId}
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <PowerSettingsNewIcon />
                    </IconButton>
                  </Link>
                </>: 
                <></>
              }

               {/* If user at /displayEvents, and not logged in */}
               {pathname === "/displayEvent" && !isLoggedIn ? 
                <>
                <Link to="/login" className={classes.links}>Login</Link>
                <Link to="/signup" className={classes.links}>SignUp</Link>
                </>: 
                <></>
              }
          </div>
      </div>
    );
  }
}

