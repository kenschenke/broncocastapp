import C from '../contants';
import { adminOrgChanged, getGroupMembers } from '../actions/adminGroupsActions';
import { setAdminOrgId } from "../actions/adminOrgActions";

export const mapAdminGroupsProps = state => {
    const groups = [...state.admin_groups.groups];
    groups.sort((g1, g2) => {
        if (g1.GroupName > g2.GroupName) {
            return 1;
        } else if (g1.GroupName < g2.GroupName) {
            return -1;
        } else {
            return 0;
        }
    });

    return {
        adminOrgId: state.admin_org.orgId,
        adminOrgs: state.admin_org.adminOrgs,
        fetching: state.admin_groups.fetching,
        errorMsg: state.admin_groups.errorMsg,
        groups: groups
    };
};

export const mapAdminGroupsDispatch = dispatch => {
    return {
        addNewGroup(navigation) {
            dispatch({
                type: C.SET_ADMIN_GROUPS_DATA,
                payload: {
                    newGroupName: '',
                    addingGroup: false,
                    newGroupErrorMsg: ''
                }
            });
            navigation.push('AdminNewGroup');
        },

        adminOrgChanged() {
            dispatch(adminOrgChanged());
        },

        init() {

        },

        setOrgId(orgId) {
            dispatch(setAdminOrgId(orgId));
        },

        showGroupDetail(GroupId, GroupName, navigation) {
            navigation.push('AdminGroupDetail');
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: {
                    deletingGroup: false,
                    deletingGroupErrorMsg: '',
                    fetchingMembers: false,
                    fetchingNonMembers: false,
                    fetchingMembersErrorMsg: '',
                    fetchingNonMembersErrorMsg: '',
                    groupId: GroupId,
                    groupName: GroupName,
                    members: [],
                    nonMembers: []
                }
            });
            dispatch(getGroupMembers());
        }
    };
};
