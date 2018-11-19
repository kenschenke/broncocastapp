import { resendRecoveryCode, resetPassword } from '../actions/forgotPasswordActions';

export const mapResetPasswordProps = state => {
    return {
        resetPasswordErrorMsg: state.forgot_password.resetPasswordErrorMsg,
        resettingPassword: state.forgot_password.resettingPassword,
        sendCodeErrorMsg: state.forgot_password.sendCodeErrorMsg,
        sendingCode: state.forgot_password.sendingCode
    };
};

export const mapResetPasswordDispatch = dispatch => {
    return {
        resetPasswordPressed(resetCode, newPassword, navigation) {
            dispatch(resetPassword(resetCode, newPassword, navigation));
        },

        sendCodePressed(navigation) {
            dispatch(resendRecoveryCode(navigation));
        }
    };
};
