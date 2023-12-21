import { Logout } from '@mui/icons-material';
import { Drawer, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
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

  return (
      <Drawer
        variant="permanent"
        anchor={"left"}
        sx={{
            width: "200px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "200px",
              boxSizing: "border-box",
              borderRight: "0px",
              backgroundColor: "#233044",
              color: "#eeeeee"
            }
          }}
        >
            {appRoutes.map((route, index) => (
                (route.index || !route.sidebarProps) ? <span key={index}></span> :
                    <ListItemButton
                        component={Link}
                        to={route.path}
                        key={index}>
                        <ListItemIcon>{route.sidebarProps?.icon}</ListItemIcon>
                        <ListItemText primary={route.sidebarProps?.displayText} />
                    </ListItemButton>
            ))}
            <ListItemButton
                onClick={(event) => handleLogout(event)}
                key={appRoutes.length+1}>
                <ListItemIcon><Logout/></ListItemIcon>
                <ListItemText primary={"Logout"} />
            </ListItemButton>
      </Drawer>    
  );
}
