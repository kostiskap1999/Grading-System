import React from 'react';
import '../styles/login.scss';
import { Drawer, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import appRoutes from '../routing/appRoutes';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { LOGOUT_USER } from '../store/types';
import { useDispatch } from 'react-redux';

export default function Sidebar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const logout = async (e: React.MouseEvent) => {
        e.preventDefault()

        dispatch({ type: LOGOUT_USER });
        navigate("/home")
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
                route.index ? <span key={index}></span> :
                    <ListItemButton
                        component={Link}
                        to={route.path}
                        key={index}>
                        <ListItemIcon>{route.sidebarProps?.icon}</ListItemIcon>
                        <ListItemText primary={route.sidebarProps?.displayText} />
                    </ListItemButton>
            ))}
            <ListItemButton
                onClick={(event) => logout(event)}
                key={appRoutes.length+1}>
                <ListItemIcon><Logout/></ListItemIcon>
                <ListItemText primary={"Logout"} />
            </ListItemButton>
      </Drawer>    
  );
}
