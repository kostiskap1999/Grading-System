// This is a list of helper functions to succinctly do the work that a hypothetical back-end would do

import Cookies from "universal-cookie";
import { errorHandling } from "../../util/error";
import { useDispatch } from "react-redux";
import { LOGIN_USER, LOGOUT_USER } from "../../store/types";
import store from "../../store/store";

export async function fetchTokens() {
    const tokens: IToken[] = await fetch("mock/tokenMock.json")
    .then(response => {
        if(!response.ok) throw new Error(JSON.stringify(response.status));
        else return response.json();
    })
    .catch((error) => {
        errorHandling(error)
    });

    return tokens
}

interface IToken {
    id: number;
    token: string;
}

export async function fetchToken(id: number) {
    const tokens: IToken[] = await fetchTokens()
    var token: string = ""

    //Extract token from users
    tokens.forEach((t: IToken) => {
        if(t.id === id)
            token = t.token
    });

    return token
}

export async function fetchIdFromToken() {
    const tokens: IToken[] = await fetchTokens()
    var id: number = -1

    const cookies: Cookies = new Cookies();
    const token: string = cookies.get('token')

    //Extract token from users
    tokens.forEach((t: IToken) => {
        if(t.token === token)
            id = t.id
    });

    if (id == -1)
        alert("Error on assigning ID from token.")
    return id
}

export async function CheckToken() {
    const tokens: IToken[] = await fetchTokens()
    var isValid: boolean = false

    const cookies: Cookies = new Cookies();
    const token: string = cookies.get('token')

    //Extract role from users
    if (token != null || token != undefined)
        tokens.forEach((t: IToken) => {
            if(t.token === token)
                isValid = true
        });

    if (isValid)
        store.dispatch({ type: LOGIN_USER });
    else
        store.dispatch({ type: LOGOUT_USER });
        
    return isValid
}