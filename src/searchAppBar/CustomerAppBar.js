import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EventIcon from '@material-ui/icons/Event';
import { Tooltip, Avatar, Slide } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link, Route } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    paddingLeft:'10px'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [showLogin, setLogin] = React.useState(false);
  const [showSignup, setSignup] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [isLoggedIn, setIsLoggedIn] = React.useState(props.login);
  const [pathname] = React.useState(props.history.location.pathname);
  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleOpenAlert = () => {
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  
const redirectToHome = () =>{
  props.history.push({
    pathname: `/`,
  });
}

const myEvents = () =>{
    props.history.push({
      pathname: `/myEvents`,
    });
  }


const redirectToCreateEvent = () =>{
  props.history.push({
    pathname: `/addNewEvent`,
  });
}

const redirectToBookings = () =>{
  props.history.push({
    pathname: `/bookings`,
  });
}

const logOut = () => {
  sessionStorage.setItem('token', '');
  sessionStorage.setItem('email', '');
  sessionStorage.setItem('user_type', '');

  if(pathname === "/")
    window.location.reload(false);
}

const handlePublishEvent = () => {
  if(sessionStorage.getItem('user_type')=="ADMIN")
  props.history.push({
    pathname: `/publishEvent`
  })
  else {
    handleOpenAlert();
  }
 
}

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logOut}>Logout</MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={redirectToHome}>
        <IconButton aria-label="home" color="inherit">
          <HomeIcon/>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Login</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Avatar src="favicon.ico" alt="B"></Avatar>
          <Typography className={classes.title} variant="h6" noWrap>
            Book My Event
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange = {props.changed}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          {/* <Typography className={classes.title} variant="h6" noWrap style={{ padding: '5px' }}>
              {/* If user is at /home hide Home button */}
              {pathname === "/" ? 
              <></> : 
              <Link to="/" className={classes.links} variant="h6">Home</Link>}

              {/* If user is at /home and not logged in, show signup & login buttons  */}
              {pathname === "/" && !isLoggedIn? 
              <>
                <Link to="/login" className={classes.links}>Login</Link>
                <Link to="/signup" className={classes.links}>SignUp</Link>
              </> : 
              <></>}  

               {/* If user is logged in  and at home page */}
               {pathname === "/" && isLoggedIn? 
              <>
                <Link to="/myEvents" className={classes.links} variant="h6">My Events</Link>
                <Link className={classes.links} variant="h6" onClick={handlePublishEvent}>Publish event</Link>
                <Link to="/" className={classes.links} variant="h6" onClick={logOut}>
                    <IconButton
                    edge="end"
                    aria-label="logout"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                    >
                        <PowerSettingsNewIcon />
                    </IconButton>
                </Link>
              </> : 
              <></>}  

              {/* If user at /myEvents or /addNewEvent page, hide login and signup buttons */}
                {pathname === "/myEvents" || pathname === "/publishEvent" ? 
                <>
                  <Link to="/" className={classes.links} variant="h6" onClick={logOut}>
                    <IconButton
                      edge="end"
                      aria-label="logout"
                      aria-controls={menuId}
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
                      aria-controls={menuId}
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

              {/* If user at /addNewEvent */}
              {pathname === "/addNewEvent" ? 
                <>
                <Link to="/publishEvent" className={classes.links}>Admin Panel</Link>
                </>: 
                <></>
              }
 
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}