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
    sign_in: dataReducer(C.SET_SIGN_IN_DATA),
    profile_name: dataReducer(C.SET_PROFILE_NAME_DATA),
    profile_contacts: dataReducer(C.SET_PROFILE_CONTACTS_DATA),
    contact_detail: dataReducer(C.SET_CONTACT_DETAIL_DATA),
    profile_orgs: dataReducer(C.SET_PROFILE_ORGS_DATA),
    user_broadcasts: dataReducer(C.SET_USER_BROADCASTS_DATA),
    broadcast_detail: dataReducer(C.SET_BROADCAST_DETAIL_DATA),
    admin_org: dataReducer(C.SET_ADMIN_ORG_DATA),
    admin_users: dataReducer(C.SET_ADMIN_USERS_DATA),
    admin_user_detail: dataReducer(C.SET_ADMIN_USER_DETAIL_DATA),
    admin_groups: dataReducer(C.SET_ADMIN_GROUPS_DATA),
    admin_group_detail: dataReducer(C.SET_ADMIN_GROUP_DETAIL_DATA)
});
