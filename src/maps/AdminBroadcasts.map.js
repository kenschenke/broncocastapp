import C from '../contants';
import { adminOrgChanged, showBroadcastDetail, showNewBroadcast } from '../actions/adminBroadcastsActions';
import { setAdminOrgId } from '../actions/adminOrgActions';

export const mapAdminBroadcastsProps = state => {
    const broadcasts = [...state.admin_broadcasts.broadcasts];
    broadcasts.sort((b1, b2) => {
        if (b1.Timestamp > b2.Timestamp) {
            return -1;
        } else if (b1.Timestamp < b2.Timestamp) {
            return 1;
        } else {
            return 0;
        }
    });

    return {
        adminOrgId: state.admin_org.orgId,
        adminOrgs: state.admin_org.adminOrgs,
        fetching: state.admin_broadcasts.fetching,
        errorMsg: state.admin_broadcasts.errorMsg,
        broadcasts: broadcasts
    };
};

export const mapAdminBroadcastsDispatch = dispatch => {
    return {
        adminOrgChanged() {
            dispatch(adminOrgChanged());
        },

        init() {

        },

        newBroadcast(navigation) {
            dispatch(showNewBroadcast(navigation));
        },

        setOrgId(orgId) {
            dispatch(setAdminOrgId(orgId));
        },

        showBroadcast(broadcastId, navigation) {
            dispatch(showBroadcastDetail(broadcastId, navigation));
        }
    };
};
