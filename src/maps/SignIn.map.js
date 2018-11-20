import C from '../contants';
import { signIn } from '../actions/signInActions';

export const mapSignInProps = state => {
    return {
        username: state.sign_in.username,
        password: state.sign_in.password,
        signingIn: state.sign_in.signingIn,
        errorMsg: state.sign_in.errorMsg
    };
};

export const mapSignInDispatch = dispatch => {
    return {
        init() {
            dispatch({
                type: C.SET_SIGN_IN_DATA,
                payload: {
                    username: '',
                    password: '',
                    signingIn: false,
                    errorMsg: false
                }
            });
        },

        passwordChanged(password) {
            dispatch({
                type: C.SET_SIGN_IN_DATA,
                payload: { password }
            });
        },

        registerPressed(navigation) {
            dispatch({
                type: C.SET_REGISTER_DATA,
                payload: {
                    email: '',
                    password: '',
                    name: '',
                    phone: '',
                    registering: false,
                    registerErrorMsg: ''
                }
            });
            navigation.navigate('Register1');
        },

        signIn(navigation) {
            dispatch(signIn(navigation));
        },

        usernameChanged(username) {
            dispatch({
                type: C.SET_SIGN_IN_DATA,
                payload: { username }
            });
        }
    };
};
