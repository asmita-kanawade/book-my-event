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
import { Tooltip, Avatar } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import PublishIcon from '@material-ui/icons/Publish';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './AppBar.css';


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
  },
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
  Snackbar:{
    position:'absolute',
    top:'10px'
  }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

export default function MainAppBar(props) {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('user_type');

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    //const [pathname] = React.useState(props.history.location.pathname);
    
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
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

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };
    
    const redirectToHome = () =>{
        props.history.push({
            pathname: `/`,
        });
    }

    const organizeEvent = () =>{
        setAlertOpen(true);
    }

    const redirectToPublishEvent = () =>{
        props.history.push({
            pathname: `/publish-event`,
        });
    }

    const redirectToAllBookings = () =>{
        props.history.push({
            pathname: `/all-bookings`,
        });
    }

    const redirectToMyBookings = () =>{
        props.history.push({
            pathname: `/my-bookings`,
        });
    }

    const redirectToLogin = () =>{
        props.history.push({
            pathname: `/login`,
        });
    }

    const redirectToSignup = () =>{
        props.history.push({
            pathname: `/signup`,
        });
    }

    const logOut = () => {
        setOpenSnackbar(true);
        sessionStorage.setItem('token', '');
        sessionStorage.setItem('email', '');
        sessionStorage.setItem('user_type', '');
        redirectToHome();
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

    {/* General Menu */}
      <MenuItem onClick={redirectToHome}>
        <IconButton aria-label="home" color="inherit">
          <HomeIcon/>
        </IconButton>
        <p>Home</p>
      </MenuItem>

      { userType !== 'ADMIN' ? 
        <MenuItem onClick={organizeEvent}>
            <IconButton aria-label="organizeEvent" color="inherit">
                <PublishIcon/>
            </IconButton>
            <p>Organize Event</p>
        </MenuItem>
        : ""
      }


    {/* Customer Menu */}
    {   token && userType === 'USER' ? 
        <MenuItem onClick={redirectToMyBookings}>
            <IconButton aria-label="my-bookings" color="inherit">
            <EventIcon/>
            </IconButton>
            <p>My Bookings</p>
        </MenuItem>
        : ""
    }

    {/* Admin Menu */}
    {   token && userType === 'ADMIN' ? ( 
        <>
            <MenuItem onClick={redirectToAllBookings}>
                <IconButton aria-label="all-bookings" color="inherit">
                <EventIcon/>
                </IconButton>
                <p>All Bookings</p>
            </MenuItem>

            <MenuItem onClick={redirectToPublishEvent}>
                <IconButton aria-label="addNew" color="inherit">
                <AddCircleIcon/>
                </IconButton>
                <p>Publish Event</p>
            </MenuItem>
        </> ) 
        : ""
    }

    {/* Logon Menu */}
    { !token ? (  
      <>        
      <MenuItem onClick={redirectToLogin}>
        <IconButton aria-label="login" color="inherit">
            <AccountCircle />
        </IconButton>
        <p>Login</p>
      </MenuItem>


      <MenuItem onClick={redirectToSignup}>
        <IconButton aria-label="signup" color="inherit">
            <HowToRegIcon />
        </IconButton>
        <p>Signup</p>
      </MenuItem>
      </>
      ) : (
      <MenuItem onClick={logOut}>
        <IconButton aria-label="logout" color="inherit">
            <PowerSettingsNewIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
      )
    }
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Avatar src="logo-192x192.png" alt="B"></Avatar>
          <Typography className={classes.title} variant="h6" noWrap>
            Book My Event
          </Typography>

          {/* <div className={classes.search}>
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
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            
            {/* General Menu */}
            <Tooltip title="Home">
                <IconButton aria-label="home" color="inherit" onClick={redirectToHome}>
                    <HomeIcon/>
                </IconButton>
            </Tooltip>

            { userType !== 'ADMIN' ? 
                <Tooltip title="Organize Event">
                    <IconButton aria-label="organizeEvent" color="inherit" onClick={organizeEvent}>
                        <PublishIcon/>
                    </IconButton>
                </Tooltip>
                : ""
            }

            {/* Customer Menu */}
            {   token && userType === 'USER' ? 
                <Tooltip title="My Bookings">
                    <IconButton aria-label="my-bookings" color="inherit" onClick={redirectToMyBookings}>
                        <EventIcon/>    
                    </IconButton>
                </Tooltip>
                : ""
            }

            {/* Admin Menu */}
            {   token && userType === 'ADMIN' ? ( 
                <>
                    <Tooltip title="All Bookings">
                        <IconButton aria-label="all-bookings" color="inherit" onClick={redirectToAllBookings}>
                            <EventIcon/>    
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Publish Event">
                        <IconButton aria-label="addNew" color="inherit" onClick={redirectToPublishEvent}>
                            <AddCircleIcon></AddCircleIcon>
                        </IconButton>
                    </Tooltip>
                </> ) 
                : ""
            }

            {/* Logon Menu */}
            { !token ? (  
            <>        
                <Tooltip title="Login">
                    <IconButton aria-label="login" color="inherit" onClick={redirectToLogin}>
                        <AccountCircle />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Signup">
                    <IconButton aria-label="signup" color="inherit" onClick={redirectToSignup}>
                        <HowToRegIcon />
                    </IconButton>
                </Tooltip>
            </> 
            ) : 
                <Tooltip title="Logout">
                    <IconButton aria-label="logout" color="inherit" onClick={logOut}>
                        <PowerSettingsNewIcon />
                    </IconButton>
                </Tooltip>
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

      <Dialog
        open={alertOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Wants to publish your event here?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <b className="b">To publish your event contact us on following email or whatsApp number.</b>

            <div className="logos-container">
              <Avatar src="emailLogo.png" className="logos"></Avatar><p className="logos">publish@bookmyevent.com</p>   
            </div> 
            <div className="logos-container">
              <Avatar src="whatsAppLogo.png" className="logos"></Avatar><p className="logos">+91-9923899300</p>
            </div>
           
           <b>Looking forward to get your call..!!</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.root, classes.Snackbar}>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info">
                Succesfully logged out!
            </Alert>
        </Snackbar>
       </div> 
    </div>
  );
}