export const mapAdminGroupsNonMembersProps = state => {
    const nonMembers = [...state.admin_group_detail.nonMembers];
    nonMembers.sort((m1, m2) => {
        if (m1.UserName > m2.UserName) {
            return 1;
        } else if (m1.UserName < m2.UserName) {
            return -1;
        } else {
            return 0;
        }
    });

    return {
        adding: state.admin_group_detail.addingMember,
        addingErrorMsg: state.admin_group_detail.addingMemberErrorMsg,
        addingUserId: state.admin_group_detail.addingMemberUserId,
        fetching: state.admin_group_detail.fetchingNonMembers,
        fetchingErrorMsg: state.admin_group_detail.fetchingNonMembersErrorMsg,
        nonMembers: nonMembers
    };
};

export const mapAdminGroupsNonMembersDispatch = dispatch => {
    return {
        addPressed(userId) {

        }
    };
};
