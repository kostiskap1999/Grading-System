import { Logout } from '@mui/icons-material';
import { Drawer, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import appRoutes from '../routing/appRoutes';
import { LOGOUT_USER } from '../store/types';
import '../styles/login.scss';
import { logout } from '../util/logout';

export default function Sidebar() {
    
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    logout()
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  return (
      <Drawer
        className='sidebar'
        variant="permanent"
        anchor={"left"}
        style={{marginLeft: "400px"}}
        >
            {appRoutes.map((route, index) => (
                (route.index || !route.sidebarProps) ? <span key={index}></span> :
                    <ListItemButton
                        style={{maxHeight: "100px"}}
                        component={Link}
                        to={route.path}
                        key={index}>
                        <ListItemIcon>{route.sidebarProps?.icon}</ListItemIcon>
                        {windowWidth > 768 && <ListItemText primary={route.sidebarProps?.displayText} />}
                    </ListItemButton>
            ))}
            <ListItemButton
                className='logout'
                onClick={(event) => handleLogout(event)}
                key={appRoutes.length+1}>
                <ListItemIcon><Logout/></ListItemIcon>
                {windowWidth > 768 && <ListItemText primary={"Logout"} />}
            </ListItemButton>
      </Drawer>    
  );
}
