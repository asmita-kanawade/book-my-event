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
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link, Route } from 'react-router-dom';
import SignInSide from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { confirmAlert } from 'react-confirm-alert'; 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    zIndex: 1000
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
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
    color: 'inherit',
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
  btn: {
    backgroundColor: '#3f51b5',
    border: 'none',
    color: 'white'
  },
  color: {
    backgroundColor: '#00a1ab'
  },
  links: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '15px',
    textDecoration:'underline solid'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function PrimarySearchAppBar(props) {

  //console.log(`[AppBar.js] props.history.location: ${JSON.stringify( props.history.location.pathname)}`);


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

  const handleSignupOpen = (show) => {
    setLogin(show);
    setSignup(!show);
  };
  const handleLoginOpen = (show) => {
    setSignup(show);
    setLogin(!show);
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
      pathname: `/addNewEvent`
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

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />

        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >

        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.color}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Book My Event
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography className={classes.title} variant="h6" noWrap style={{ padding: '5px' }}>
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
                {pathname === "/myEvents" || pathname === "/addNewEvent" ? 
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


            </Typography>
          </div>
          <div className={classes.sectionMobile}>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {showLogin ? <SignInSide /> : ""}
      {showSignup ? <SignUp /> : ""}
      <div>
      <Dialog
        open={alertOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Wants to publish event?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <b>Only admin can publish events. If you want to publish your event, please email us on 'admin@events.in'.</b>
            <p>Sorry for inconvenience..!</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
}