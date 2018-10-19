import C from '../contants';
import { combineReducers } from 'redux';
import objectAssign from 'object-assign';

export const dataReducer = type => (state={}, action) => {
    if (type === action.type) {
        let newState = objectAssign({}, state);
        return objectAssign(newState, action.payload);
    } else {
        return state;
    }
};

export default combineReducers({
    sign_in: dataReducer(C.SET_SIGN_IN_DATA)
});
