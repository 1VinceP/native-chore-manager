import firebase from 'firebase';

import {
    SET_USER,
    UPDATE_USER,
    SELECT_CHILD,
    MANAGE_POINTS,
    ITEMS_FETCH_SUCCESS,
    SELECT_I_CHILD,
    USER_CHORES_FETCH_SUCCESS
} from '../types';

export function setUser( name, password, manager, admin, uid, chores, points ) {

    return {
        type: SET_USER,
        payload: { name, password, manager, admin, uid, chores, points }
    }
}

export function updateUser( name, password, manager, admin, uid ) {
    const { currentUser } = firebase.auth()
    
    return dispatch => {
        firebase.database().ref( `/users/${currentUser.uid}/family/${uid}` )
            .update({ name, password, manager, admin })
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

export function getUserChores( uid ) {
    const { currentUser } = firebase.auth()

    return dispatch => {
        firebase.database().ref( `/users/${currentUser.uid}/family/${uid}/chores` )
            .on( 'value', snapshot => {
                dispatch({
                    type: USER_CHORES_FETCH_SUCCESS,
                    payload: snapshot.val()
                })
            } )
    }
}

export function assignChoreToPerson( name, priority, reward, recurring, uidList ) {
    const { currentUser } = firebase.auth()

    return () => {
        for( let i = 0; i < uidList.length; i++ ) {
            if( uidList[i] ) {
                firebase.database().ref( `/users/${currentUser.uid}/family/${uidList[i]}/chores` )
                    .push({ name, reward, priority, recurring })
            }
        }
    }
}

export function completeChore( currentPoints, reward, choreUid, userUid ) {
    const { currentUser } = firebase.auth()

    return dispatch => {
        firebase.database().ref( `/users/${currentUser.uid}/family/${userUid}/chores/${choreUid}` )
            .remove()
            .then( () => {
                addChorePoints( currentPoints, reward, userUid, dispatch )
            } )
    }
}
function addChorePoints( oldPoints, newPoints, uid, dispatch ) {
    const { currentUser } = firebase.auth()
    let currentPoints = oldPoints + newPoints

    firebase.database().ref( `/users/${currentUser.uid}/family/${uid}` )
        .update({ points: currentPoints })
        .then( () => {
            dispatch({
                type: MANAGE_POINTS,
                payload: currentPoints
            })
        } )
}