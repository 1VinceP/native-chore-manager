import {
    SET_USER,
    UPDATE_USER,
    SELECT_CHILD,
    MANAGE_POINTS
} from '../types';

const initialState = {
    user: {
        name: '',
        password: '',
        manager: null,
        uid: '',
        chores: [],
        points: 0
    },
    selection: null
}

export default ( state = initialState, action ) => {
    switch( action.type ) {
        case SET_USER:
            const { name, password, manager, uid, chores, points } = action.payload
            return { ...state, user: { name, password, manager, uid, chores, points } }
        case UPDATE_USER:
            return initialState
        case SELECT_CHILD:
            if( action.payload === state.selection )
                return { ...state, selection: null }
            return { ...state, selection: action.payload }
        case MANAGE_POINTS:
            console.log( 'payload:', action.payload )
            return { ...state, user: { ...state.user, points: action.payload } }

        default:
            return state
    }
}