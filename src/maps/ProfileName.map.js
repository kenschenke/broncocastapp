import C from '../contants';
import { getProfileName, updateProfileName } from '../actions/profileNameActions';

export const mapProfileNameProps = state => {
    return {
        errorMsg: state.profile_name.errorMsg,
        name: state.profile_name.name,
        getting: state.profile_name.getting,
        updating: state.profile_name.updating
    };
};

export const mapProfileNameDispatch = dispatch => {
    return {
        init() {
            dispatch({
                type: C.SET_PROFILE_NAME_DATA,
                payload: {
                    name: '',
                    getting: false,
                    updating: false,
                    errorMsg: ''
                }
            });

            dispatch(getProfileName());
        },

        nameChanged(name) {
            dispatch({
                type: C.SET_PROFILE_NAME_DATA,
                payload: { name }
            });
        },

        update() {
            dispatch(updateProfileName());
        }
    };
};
