import { removeMember } from '../actions/adminGroupsActions';

export const mapAdminGroupMembersProps = state => {
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
        removing: state.admin_group_detail.removingMember,
        removingErrorMsg: state.admin_group_detail.removingMemberErrorMsg,
        removingMemberId: state.admin_group_detail.removingMemberId,
        members: members
    };
};

export const mapAdminGroupMembersDispatch = dispatch => {
    return {
        removePressed(MemberId, UserId, UserName) {
            dispatch(removeMember(MemberId, UserId, UserName));
        }
    };
};
