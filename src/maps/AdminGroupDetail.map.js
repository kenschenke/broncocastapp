import { deleteGroup, getGroupNonMembers, showRenameGroupScreen } from '../actions/adminGroupsActions';

export const mapAdminGroupDetailProps = state => {
    const members = [...state.admin_group_detail.members];
    members.sort((m1, m2) => {
        if (m1.UserName > m2.UserName) {
            return 1;
        } else if (m1.UserName < m2.UserName) {
            return -1;
        } else {
            return 0;
        }
    });

    return {
        deletingGroup: state.admin_group_detail.deletingGroup,
        deletingGroupErrorMsg: state.admin_group_detail.deletingGroupErrorMsg,
        errorMsg: state.admin_group_detail.fetchingMembersErrorMsg,
        fetching: state.admin_group_detail.fetchingMembers,
        members: members
    };
};

export const mapAdminGroupDetailDispatch = dispatch => {
    return {
        addMembersPressed(navigation) {
            dispatch(getGroupNonMembers());
            navigation.push('AdminGroupNonMembers');
        },

        deleteGroupPressed(navigation) {
            dispatch(deleteGroup(navigation));
        },

        removeMembersPressed(navigation) {
            navigation.push('AdminGroupMembers');
        },

        renameGroupPressed(navigation) {
            dispatch(showRenameGroupScreen(navigation));
        }
    };
};
