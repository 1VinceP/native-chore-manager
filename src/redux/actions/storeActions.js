import firebase from 'firebase';

import {
    STORE_FETCH_SUCCESS,
    SELECT_ITEM,
    RESET_ITEM
} from '../types';

export function createStoreItem( name, price, imgURL ) {
    const { currentUser } = firebase.auth()

    return () => {
        firebase.database().ref( `/users/${currentUser.uid}/store` )
            .push({ name, price, imgURL })
    }
}

export function getStoreList() {
    const { currentUser } = firebase.auth()

    return dispatch => {
        firebase.database().ref( `/users/${currentUser.uid}/store` )
            .on( 'value', snapshot => {
                dispatch({
                    type: STORE_FETCH_SUCCESS,
                    payload: snapshot.val()
                })
            } )
    }
}

export function selectItem( uid ) {

    return {
        type: SELECT_ITEM,
        payload: uid
    }
}

export function resetSelectedItem() {

    return {
        type: RESET_ITEM
    }
}

export function saveItem( name, price ) {
    const { currentUser } = firebase.auth()

    return () => {
        firebase.database().ref( `/users/${currentUser.uid}/store` )
            .push({ name, price })
    }
}

export function deleteItem( uid ) {
    const { currentUser } = firebase.auth()

    return () => {
        firebase.database().ref( `/users/${currentUser.uid}/store/${uid}` )
            .remove()
    }
}