import C from '../contants';
import { addRemoveAdmin, approveUser, dropUser, hideUnhideUser, updateUserName } from '../actions/adminUsersActions';

export const mapAdminUserDetailProps = state => {
    return {
        adminWorking: state.admin_user_detail.adminWorking,
        adminErrorMsg: state.admin_user_detail.adminErrorMsg,
        approving: state.admin_user_detail.approving,
        approvingErrorMsg: state.admin_user_detail.approvingErrorMsg,
        contacts: state.admin_user_detail.contacts,
        droppingUser: state.admin_user_detail.droppingUser,
        droppingUserErrorMsg: state.admin_user_detail.droppingUserErrorMsg,
        hiding: state.admin_user_detail.hiding,
        hidingErrorMsg: state.admin_user_detail.hidingErrorMsg,
        isAdmin: state.admin_user_detail.isAdmin,
        isApproved: state.admin_user_detail.isApproved,
        isHidden: state.admin_user_detail.isHidden,
        memberId: state.admin_user_detail.memberId,
        smsLogs: state.admin_user_detail.smsLogs,
        updatingUserName: state.admin_user_detail.updatingUserName,
        updatingUserNameDone: state.admin_user_detail.updatingUserNameDone,
        userName: state.admin_user_detail.userName,
        userNameErrorMsg: state.admin_user_detail.userNameErrorMsg
    };
};

export const mapAdminUserDetailDispatch = dispatch => {
    return {
        addRemoveAdmin() {
            dispatch(addRemoveAdmin());
        },

        approveUser() {
            dispatch(approveUser());
        },

        dropUser(navigation) {
            dispatch(dropUser(navigation));
        },

        hideUnhide() {
            dispatch(hideUnhideUser());
        },

        nameChanged(userName) {
            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: {
                    updatingUserName: false,
                    updatingUserNameDone: false,
                    userName: userName
                }
            });
        },

        updateName() {
            dispatch(updateUserName());
        }
    };
};
