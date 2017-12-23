import firebase from 'firebase';

import {
    FAM_PASS_CHANGED,
    FAMILY_FETCH_SUCCESS,
    FAMILY_OPTIONS
} from '../types';

export function famPassChanged( text ) {

    return {
        type: FAM_PASS_CHANGED,
        payload: text
    }
}

export function getFamily() {
    const { currentUser } = firebase.auth()

    return dispatch => {
        firebase.database().ref( `/users/${currentUser.uid}/family` )
            .on( 'value', snapshot => {
                dispatch({
                    type: FAMILY_FETCH_SUCCESS,
                    payload: snapshot.val()
                })
            } )
    }
}

export function createPerson( name, password, manager, admin, points = 0 ) {
    const { currentUser } = firebase.auth()

    return () => {
        firebase.database().ref( `/users/${currentUser.uid}/family` )
            .push( { name, password, manager, admin, points } )
    }
}