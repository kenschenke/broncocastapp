import C from '../contants';
import { selectEveryone, selectGroupMembers, toggleUserSelected, unselectGroupMembers } from '../actions/adminBroadcastsActions';

export const mapAdminBroadcastRecipientsProps = state => {
    return {
        fetching: state.admin_broadcasts.fetchingGroups,
        errorMsg: state.admin_broadcasts.fetchingGroupsErrorMsg,
        groups: state.admin_broadcasts.groups,
        selected: state.admin_broadcasts.selectedUsers,
    };
};

export const mapAdminBroadcastRecipientsDispatch = dispatch => {
    return {
        selectAllGroupMembers(Members) {
            dispatch(selectGroupMembers(Members));
        },

        selectEveryone() {
            dispatch(selectEveryone());
        },

        unselectAllGroupMembers(Members) {
            dispatch(unselectGroupMembers(Members));
        },

        unselectEveryone() {
            dispatch({
                type: C.SET_ADMIN_BROADCASTS_DATA,
                payload: { selectedUsers: [] }
            });
        },

        userPressed(UserId) {
            dispatch(toggleUserSelected(UserId));
        }
    };
};
