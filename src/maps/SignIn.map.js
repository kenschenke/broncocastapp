import C from '../contants';
import { signIn } from '../actions/signInActions';

export const mapSignInProps = state => {
    return {
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
                    signingIn: false,
                    errorMsg: false
                }
            });
        },

        signIn(username, password, navigation) {
            dispatch(signIn(username, password, navigation));
        }
    };
};
