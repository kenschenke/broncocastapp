import C from '../contants';
import { fetchUrl } from '../helpers';

export const resendRecoveryCode = navigation => (dispatch, getState) => {
    const state = getState();

    dispatch(sendRecoveryCode(state.forgot_password.contact, navigation));
};

export const resetPassword = (resetCode, newPassword, navigation) => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_FORGOT_PASSWORD_DATA,
        payload: { resettingPassword: true, resetPasswordErrorMsg: '' }
    });

    let formData = new FormData();
    formData.append('Code', resetCode);
    formData.append('Password', newPassword);
    formData.append('Contact', state.forgot_password.contact);

    fetchUrl(`${C.URL_RECOVER_SAVE_PASSWORD}`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to save password');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_FORGOT_PASSWORD_DATA,
                payload: { resettingPassword: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_FORGOT_PASSWORD_DATA,
                    payload: { resetPasswordErrorMsg: data.Error }
                });
                return;
            }

            navigation.replace('ResetPasswordDone');
        })
        .catch(Error => {
            dispatch({
                type: C.SET_FORGOT_PASSWORD_DATA,
                payload: { resettingPassword: false, resetPasswordErrorMsg: Error.message }
            });
        });
};

export const sendRecoveryCode = (contact, navigation) => dispatch => {
    dispatch({
        type: C.SET_FORGOT_PASSWORD_DATA,
        payload: { contact, sendingCode: true, errorMsg: '' }
    });

    let formData = new FormData();
    formData.append('Contact', contact);

    fetchUrl(`${C.URL_RECOVER_SEND_CODE}`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to send recovery code');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_FORGOT_PASSWORD_DATA,
                payload: { sendingCode: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_FORGOT_PASSWORD_DATA,
                    payload: { errorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_FORGOT_PASSWORD_DATA,
                payload: {
                    resetPasswordErrorMsg: '',
                    resettingPassword: false,
                    sendCodeErrorMsg: '',
                    sendingCode: false
                }
            });

            navigation.replace('ResetPassword');
        })
        .catch(Error => {
            dispatch({
                type: C.SET_FORGOT_PASSWORD_DATA,
                payload: { sendingCode: false, errorMsg: Error.message }
            });
        });
};
