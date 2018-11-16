import C from '../contants';

export const mapForgotPasswordProps = state => {
    return {
        errorMsg: state.forgot_password.errorMsg,
        findingAccount: state.forgot_password.findingAccount
    };
};

export const mapForgotPasswordDispatch = dispatch => {
    return {
        findAccount(navigation) {
            dispatch({
                type: C.SET_FORGOT_PASSWORD_DATA,
                payload: { findingAccount: true, errorMsg: '' }
            });

            setTimeout(() => {
                dispatch({
                    type: C.SET_FORGOT_PASSWORD_DATA,
                    payload: { findingAccount: false, errorMsg: 'Error message goes here' }
                });
            }, 2500);
        }
    };
};
