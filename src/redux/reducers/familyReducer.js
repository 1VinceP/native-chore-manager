import {
    FAM_PASS_CHANGED,
    FAMILY_FETCH_SUCCESS,
    FAMILY_OPTIONS
} from '../types';

const initialState = {
    famPass: '',
    famList: {}
}

export default ( state = initialState, action ) => {
    switch( action.type ) {
        case FAM_PASS_CHANGED:
            return { ...state, famPass: action.payload }
        case FAMILY_FETCH_SUCCESS:
            return { ...state, famList: action.payload }

        default:
            return state
    }
}