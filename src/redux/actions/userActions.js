import firebase from 'firebase';

import {
    SET_USER,
    UPDATE_USER,
    SELECT_CHILD,
    MANAGE_POINTS
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
            .update({ name, password, manager })
            // .then( () => {

            // } )
    }
}

export function selectChild( uid ) {
    
    return {
        type: SELECT_CHILD,
        payload: uid
    }
}

export function managePoints( oldPoints, newPoints, uid ) {
    const { currentUser } = firebase.auth()
    let currentPoints = oldPoints + newPoints

    return dispatch => {
        firebase.database().ref( `/users/${currentUser.uid}/family/${uid}` )
            .update({ points: currentPoints })
            .then( () => {
                dispatch({
                    type: MANAGE_POINTS,
                    payload: currentPoints
                })
            } )
    }
}