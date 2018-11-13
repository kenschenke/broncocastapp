import { deleteGroup } from '../actions/adminGroupsActions';

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

        },

        deleteGroupPressed(navigation) {
            dispatch(deleteGroup(navigation));
        },

        removeMembersPressed(navigation) {

        },

        renameGroupPressed(navigation) {

        }
    };
};
