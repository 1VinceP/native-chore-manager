import firebase from 'firebase';

import {
    SET_USER,
    UPDATE_USER
} from '../types';

export function setUser( name, password, manager, uid, chores, points ) {

    return {
        type: SET_USER,
        payload: { name, password, manager, uid, chores, points }
    }
}

export function updateUser( name, password, manager, uid ) {
    const { currentUser } = firebase.auth()
    
    return dispatch => {
        firebase.database().ref( `/users/${currentUser.uid}/family/${uid}` )
            .set({ name, password, manager })
            // .then( () => {
                
            // } )
    }
}