import C from '../contants';
import { approveUser, hideUnhideUser, updateUserName } from '../actions/adminUsersActions';

export const mapAdminUserDetailProps = state => {
    return {
        approving: state.admin_user_detail.approving,
        approvingErrorMsg: state.admin_user_detail.approvingErrorMsg,
        hiding: state.admin_user_detail.hiding,
        hidingErrorMsg: state.admin_user_detail.hidingErrorMsg,
        isApproved: state.admin_user_detail.isApproved,
        isHidden: state.admin_user_detail.isHidden,
        memberId: state.admin_user_detail.memberId,
        updatingUserName: state.admin_user_detail.updatingUserName,
        updatingUserNameDone: state.admin_user_detail.updatingUserNameDone,
        userName: state.admin_user_detail.userName,
        userNameErrorMsg: state.admin_user_detail.userNameErrorMsg
    };
};

export const mapAdminUserDetailDispatch = dispatch => {
    return {
        approveUser() {
            dispatch(approveUser());
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
