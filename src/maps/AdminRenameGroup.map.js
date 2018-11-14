import C from '../contants';
import { renameGroup } from '../actions/adminGroupsActions';

export const mapAdminRenameGroupProps = state => {
    return {
        renaming: state.admin_group_detail.renamingGroup,
        errorMsg: state.admin_group_detail.renamingErrorMsg,
        groupName: state.admin_group_detail.renamingGroupName
    };
};

export const mapAdminRenameGroupDispatch = dispatch => {
    return {
        renameGroup(navigation) {
            dispatch(renameGroup(navigation));
        },

        groupNameChanged(groupName) {
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { renamingGroupName: groupName }
            });
        }
    };
};
