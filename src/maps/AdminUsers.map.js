import C from '../contants';
import { adminOrgChanged, setUserDetail } from '../actions/adminUsersActions';
import { setAdminOrgId } from '../actions/adminOrgActions';

export const mapAdminUsersProps = state => {
    let numHiddenUsers = 0;
    let numUnapprovedUsers = 0;
    let numDeliveryProblems = 0;

    const users = state.admin_users.users.filter(user => {
        if (user.Hidden) {
            numHiddenUsers++;
        }
        if (!user.Approved) {
            numUnapprovedUsers++;
        }
        if (user.HasDeliveryError) {
            numDeliveryProblems++;
        }

        switch (state.admin_users.filterOn) {
            case 'showhidden': return true;
            case 'hidehidden': return !user.Hidden;
            case 'onlyunapproved': return !user.Approved;
            case 'onlydeliveryproblems': return user.HasDeliveryError;
        }
    });
    users.sort((u1, u2) => {
        if (u1.UsrName > u2.UsrName) {
            return 1;
        } else if (u1.UsrName < u2.UsrName) {
            return -1;
        } else {
            return 0;
        }
    });

    return {
        adminOrgId: state.admin_org.orgId,
        adminOrgs: state.admin_org.adminOrgs,
        errorMsg: state.admin_users.errorMsg,
        fetching: state.admin_users.fetching,
        filterOn: state.admin_users.filterOn,
        numDeliveryProblems: numDeliveryProblems,
        numHidden: numHiddenUsers,
        numUnapproved: numUnapprovedUsers,
        users: users
    };
};

export const mapAdminUsersDispatch = dispatch => {
    return {
        adminOrgChanged() {
            dispatch(adminOrgChanged());
        },

        init() {
            dispatch({
                type: C.SET_ADMIN_USERS_DATA,
                payload: { filterOn: 'hidehidden' }
            });
        },

        setFilterOn(filterOn) {
            dispatch({
                type: C.SET_ADMIN_USERS_DATA,
                payload: { filterOn }
            });
        },

        setOrgId(orgId) {
            dispatch(setAdminOrgId(orgId));
        },

        showModal() {
            dispatch({
                type: C.SET_ADMIN_USERS_DATA,
                payload: { modalVisible: true }
            });
        },

        showUserDetail(usrId, navigation) {
            dispatch(setUserDetail(usrId));
            navigation.push('AdminUserDetail');
        }
    };
};
