import C from "../contants";
import { registerUser } from '../actions/registerActions';

export const mapRegister2Props = state => {
    return {
        name: state.register.name,
        phone: state.register.phone,
        registering: state.register.registering,
        registerErrorMsg: state.register.registerErrorMsg
    };
};

export const mapRegister2Dispatch = dispatch => {
    return {
        nameChanged(name) {
            dispatch({
                type: C.SET_REGISTER_DATA,
                payload: { name }
            });
        },

        phoneChanged(phone) {
            dispatch({
                type: C.SET_REGISTER_DATA,
                payload: { phone }
            });
        },

        register(navigation) {
            dispatch(registerUser(navigation));
        }
    };
};
