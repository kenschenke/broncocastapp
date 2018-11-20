import C from '../contants';

export const mapRegister1Props = state => {
    return {
        email: state.register.email,
        password: state.register.password
    };
};

export const mapRegister1Dispatch = dispatch => {
    return {
        emailChanged(email) {
            dispatch({
                type: C.SET_REGISTER_DATA,
                payload: { email }
            });
        },

        passwordChanged(password) {
            dispatch({
                type: C.SET_REGISTER_DATA,
                payload: { password }
            });
        }
    };
};
