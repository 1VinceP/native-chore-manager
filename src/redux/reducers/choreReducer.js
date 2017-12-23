import {
    CHORE_FETCH_SUCCESS,
    SELECT_CHORE
} from '../types';

const initialState = {
    chores: {},
    selectedChore: null
}

export default ( state = initialState, action ) => {
    switch( action.type ) {
        case CHORE_FETCH_SUCCESS:
            return { ...state, chores: action.payload }
        case SELECT_CHORE:
            if( action.payload === state.selectedChore )
                return { ...state, selectedChore: null }
            return { ...state, selectedChore: action.payload}

        default:
            return state
    }
}