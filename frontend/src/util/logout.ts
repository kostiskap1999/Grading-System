// useLogout.js
import { LOGOUT_USER } from "../store/types";
import Cookies from "universal-cookie";
import store from '../store/store';


export const logout = () => {
    store.dispatch({ type: LOGOUT_USER });

    const cookies = new Cookies();
    cookies.remove('token');
  };
