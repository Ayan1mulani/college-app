import  React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import LogoutIcon from '@mui/icons-material/Logout';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import MessageIcon from '@mui/icons-material/Message';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Link } from 'react-router-dom';
import ClassCard from './ClassCard';
import MessageScreen from './MessageScreen';
import PortraitIcon from '@mui/icons-material/Portrait';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchGetData from '../Client/Clinet';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      marginLeft: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#f6ba70',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isMessageScreenOpen, setMessageScreenOpen] = React.useState(false);
  const [teachers, setTeachers] = React.useState([]); // Use an array for teachers

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleFabClick = () => setMessageScreenOpen(!isMessageScreenOpen);
  const handleCloseMessageScreen = () => setMessageScreenOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in sessionStorage
    const token = sessionStorage.getItem('token');
    if (!token) navigate('/');
  }, [navigate]);

  useEffect(() => {
    // Fetch teacher data
    const getTeachers = async () => {
      try {
        const response = await fetchGetData(`/view/teachers/SOE`);
        setTeachers(response.data); // Save the entire array of teachers
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTeachers();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Student Dashboard
          </Typography>
          <button
            className="logout-btn"
            onClick={(e) => {
              if (window.confirm("Are you sure you want to logout?")) {
                sessionStorage.removeItem('token');
                window.location.href = '/';
              } else {
                e.preventDefault();
              }
            }}
          >
            <LogoutIcon />
          </button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <Link to="/view/classmates" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>
                  <PortraitIcon />
                </ListItemIcon>
                <ListItemText primary="Classmates" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link to="/view/timetable" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton>
                <ListItemIcon>
                  <EventNoteIcon />
                </ListItemIcon>
                <ListItemText primary="Timetable" />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <div className="flex">
          <div className="grid-container card-2">
            {teachers.map((teacher, index) => (
              <ClassCard
                key={index}
                subjectName={teacher.subject || "No Subject"}
                subjectTeacher={teacher.teacherName || "No Teacher"}
                backgroundImage="https://www.gstatic.com/classroom/themes/img_breakfast.jpg " 
                
              />
            ))}
          </div>
          {isMessageScreenOpen && <MessageScreen onClose={handleCloseMessageScreen} senderType="Student" />}
        </div>
        <div className="btn-position">
          {!isMessageScreenOpen && (
            <Fab color="secondary" id="Mgs-button" onClick={handleFabClick}>
              <MessageIcon />
            </Fab>
          )}
        </div>
      </Main>
    </Box>
  );
}