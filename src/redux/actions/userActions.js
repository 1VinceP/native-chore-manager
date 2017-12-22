import firebase from 'firebase';

import {
    SET_USER,
    UPDATE_USER,
    SELECT_CHILD,
    MANAGE_POINTS,
    ITEMS_FETCH_SUCCESS,
    SELECT_I_CHILD
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

export function getUserItems( uid ) {
    const { currentUser } = firebase.auth()

    return dispatch => {
        firebase.database().ref( `/users/${currentUser.uid}/family/${uid}/inventory` )
            .on( 'value', snapshot => {
                dispatch({
                    type: ITEMS_FETCH_SUCCESS,
                    payload: snapshot.val()
                })
            })
    }
}

export function addItemToUser( itemName, userUid ) {
    const { currentUser } = firebase.auth()

    return () => {
        firebase.database().ref( `/users/${currentUser.uid}/family/${userUid}/inventory` )
            .push({ itemName })
    }
}

export function removeItemFromUser( userUid, itemUid ) {
    const { currentUser } = firebase.auth()

    return () => {
        firebase.database().ref( `/users/${currentUser.uid}/family/${userUid}/inventory/${itemUid}` )
            .remove()
    }
}

export function selectInventoryChild( uid ) {

    return {
        type: SELECT_I_CHILD,
        payload: uid
    }
}