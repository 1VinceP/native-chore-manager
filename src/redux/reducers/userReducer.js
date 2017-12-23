import {
    SET_USER,
    UPDATE_USER,
    SELECT_CHILD,
    MANAGE_POINTS,
    ITEMS_FETCH_SUCCESS,
    SELECT_I_CHILD,
    USER_CHORES_FETCH_SUCCESS
} from '../types';

const initialState = {
    user: {
        name: '',
        password: '',
        manager: null,
        admin: null,
        uid: '',
        chores: {},
        points: 0,
        inventory: {}
    },
    childSelection: null,
    inventorySelection: null
}

export default ( state = initialState, action ) => {
    switch( action.type ) {
        case SET_USER:
            const { name, password, manager, admin, uid, chores, points } = action.payload
            return { ...state, user: { name, password, manager, admin, uid, chores, points } }
        case UPDATE_USER:
            return initialState
        case SELECT_CHILD:
            if( action.payload === state.childSelection )
                return { ...state, childSelection: null }
            return { ...state, childSelection: action.payload }
        case MANAGE_POINTS:
            return { ...state, user: { ...state.user, points: action.payload } }
        case ITEMS_FETCH_SUCCESS:
            return { ...state, user: { ...state.user, inventory: action.payload } }
        case SELECT_I_CHILD:
            if( action.payload === state.inventorySelection )
                return { ...state, inventorySelection: null }
            return  { ...state, inventorySelection: action.payload }
        case USER_CHORES_FETCH_SUCCESS:
            return { ...state, user: { ...state.user, chores: action.payload } }

        default:
            return state
    }
}