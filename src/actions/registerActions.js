import C from '../contants';
import { fetchUrl } from '../helpers';
import { signIn } from './signInActions';

export const registerUser = navigation => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_REGISTER_DATA,
        payload: { registering: true, registerErrorMsg: '' }
    });

    const Email = state.register.email.trim();
    const Password = state.register.password.trim();
    const Phone = state.register.phone.replace(/[^0-9]/g, '');

    let formData = new FormData();
    formData.append('Name', state.register.name.trim());
    formData.append('Password', Password);
    formData.append('Email', Email);
    formData.append('Phone', Phone);

    fetchUrl(`${C.URL_REGISTER}`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to register');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_REGISTER_DATA,
                payload: { registering: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_REGISTER_DATA,
                    payload: { registerErrorMsg: data.Error }
                });
                return;
            }

            // "Fill in" the sign in form with the new email and password
            // and then trigger the signIn action.

            dispatch({
                type: C.SET_SIGN_IN_DATA,
                payload: {
                    username: Email,
                    password: Password
                }
            });
            navigation.popToTop();
            dispatch(signIn(navigation));
        })
        .catch(Error => {
            dispatch({
                type: C.SET_REGISTER_DATA,
                payload: { registering: false, registerErrorMsg: Error.message }
            });
        });
};
