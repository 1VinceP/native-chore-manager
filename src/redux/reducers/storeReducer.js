import {
    STORE_FETCH_SUCCESS,
    SELECT_ITEM,
    RESET_ITEM
} from '../types';

const initialState = {
    storeList: {},
    selectedItem: null
}

export default ( state = initialState, action ) => {
    switch( action.type ) {
        case STORE_FETCH_SUCCESS:
            return { ...state, storeList: action.payload }
        case SELECT_ITEM:
            if( action.payload === state.selectedItem )
                return { ...state, selectedItem: null }
            return { ...state, selectedItem: action.payload }
        case RESET_ITEM:
            return { ...state, selectedItem: null }

        default:
            return state
    }
}