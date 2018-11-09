import C from '../contants';
import { updateUserName } from '../actions/adminUsersActions';

export const mapAdminUserDetailProps = state => {
    return {
        memberId: state.admin_user_detail.memberId,
        updatingUserName: state.admin_user_detail.updatingUserName,
        updatingUserNameDone: state.admin_user_detail.updatingUserNameDone,
        userName: state.admin_user_detail.userName,
        userNameErrorMsg: state.admin_user_detail.userNameErrorMsg
    };
};

export const mapAdminUserDetailDispatch = dispatch => {
    return {
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
