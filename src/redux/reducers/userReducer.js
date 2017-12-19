import {
    SET_USER,
    UPDATE_USER
} from '../types';

const initialState = {
    user: {
        name: '',
        password: '',
        manager: null,
        uid: '',
        chores: [],
        points: 0
    }
}

export default ( state = initialState, action ) => {
    switch( action.type ) {
        case SET_USER:
            const { name, password, manager, uid, chores, points } = action.payload
            return { ...state, user: { name, password, manager, uid, chores, points } }
        case UPDATE_USER:
            return initialState

        default:
            return state
    }
}