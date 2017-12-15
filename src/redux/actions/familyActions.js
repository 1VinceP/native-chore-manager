import firebase from 'firebase';

import {
    FAM_PASS_CHANGED,
    FAMILY_FETCH_SUCCESS
} from '../types';

export function famPassChanged( text ) {

    return {
        type: FAM_PASS_CHANGED,
        payload: text
    }
}

export function getFamily() {
    const { currentUser } = firebase.auth()

    console.log( 'hit getFamily' )

    return dispatch => {
        firebase.database().ref( `/users/${currentUser.uid}/family` )
            .on( 'value', snapshot => {
                console.log( 'snapshot:', snapshot.val() )
                dispatch({
                    type: FAMILY_FETCH_SUCCESS,
                    payload: snapshot.val()
                })
            } )
    }
}

export function createPerson( name, password, manager ) {
    const { currentUser } = firebase.auth()

    return dispatch => {
        firebase.database().ref( `/users/${currentUser.uid}/family` )
            .push( { name, password, manager } )
            .then( () => console.log( 'new person created with:', name, password, manager ) )
    }
}