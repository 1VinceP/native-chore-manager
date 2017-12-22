import firebase from 'firebase';

import {
    CHORE_FETCH_SUCCESS,
    SELECT_CHORE
} from '../types';

export function getChores() {
    const { currentUser } = firebase.auth()
    
    return dispatch => {
        firebase.database().ref( `/users/${currentUser.uid}/chores` )
            .on( 'value', snapshot => {
                dispatch({
                    type: CHORE_FETCH_SUCCESS,
                    payload: snapshot.val()
                })
            } )
    }
}

export function createChore( name, priority, reward, recurring ) {
    const { currentUser } = firebase.auth()

    return () => {
        firebase.database().ref( `/users/${currentUser.uid}/chores` )
            .push({ name, priority, reward, recurring })
    }
}

export function deleteChore( uid ) {
    const { currentUser } = firebase.auth()

    return () => {
        firebase.database().ref( `/users/${currentUser.uid}/chores/${uid}` )
            .remove()
    }
}

export function selectChore( uid ) {

    return {
        type: SELECT_CHORE,
        payload: uid
    }
}