import C from '../contants';
import { sendRecoveryCode } from '../actions/forgotPasswordActions';

export const mapForgotPasswordProps = state => {
    return {
        errorMsg: state.forgot_password.errorMsg,
        findingAccount: state.forgot_password.findingAccount
    };
};

export const mapForgotPasswordDispatch = dispatch => {
    return {
        findAccount(contact, navigation) {
            dispatch(sendRecoveryCode(contact, navigation));
        }
    };
};
