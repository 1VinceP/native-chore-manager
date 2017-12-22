import firebase from 'firebase';

import {

} from '../types';

export function createChore( name, priority, reward ) {
    const { currentUser } = firebase.auth()

    return () => {
        firebase.database().ref( `/users/${currentUser.uid}/chores` )
            .push({ name, priority, reward })
    }
}