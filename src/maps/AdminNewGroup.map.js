import C from '../contants';
import { addGroup } from '../actions/adminGroupsActions';

export const mapAdminNewGroupProps = state => {
    return {
        addingGroup: state.admin_groups.addingGroup,
        newGroupErrorMsg: state.admin_groups.newGroupErrorMsg,
        newGroupName: state.admin_groups.newGroupName
    };
};

export const mapAdminNewGroupDispatch = dispatch => {
    return {
        addNewGroup(navigation) {
            dispatch(addGroup(navigation));
        },

        groupNameChanged(groupName) {
            dispatch({
                type: C.SET_ADMIN_GROUPS_DATA,
                payload: { newGroupName: groupName }
            });
        }
    };
};
