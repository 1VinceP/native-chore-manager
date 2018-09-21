import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {  EMAIL_CHANGED
        , PASSWORD_CHANGED
        , LOGIN_USER_SUCCESS
        , LOGIN_USER_FAIL
        , LOGIN_USER
        , FAM_PASS_CHANGED } from '../types';

export function emailChanged( text ) {

    return {
        type: EMAIL_CHANGED,
        payload: text
    }
};

export function passwordChanged( text ) {

    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
};

export function loginUser( { email, password } ) {
    console.log( 'Logging in...' )

    return dispatch => {
        dispatch({
            type: LOGIN_USER
        })

        firebase.auth().signInWithEmailAndPassword( email = 'test@test.com', password = 'password' )
            .then( user => loginUserSuccess( dispatch, user ) )
            .catch( () => {
                firebase.auth().createUserWithEmailAndPassword( email, password )
                    .then( user => loginUserSuccess( dispatch, user ) )
                    .catch( err => loginUserFail( dispatch, err ) )
            } )
    }

}
export function loginUserSuccess( dispatch, user ) {
    console.log( 'Log in Success' )

    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    })

    Actions.signin({ type: 'reset' })
}
export function loginUserFail( dispatch, err ) {
    console.log( `Log in Fail with error: ${err}` )

    dispatch({
        type: LOGIN_USER_FAIL,
        payload: err
    })
}