import C from '../contants';
import { fetchUrl } from '../helpers';

export const getProfileName = () => dispatch => {
    dispatch({
        type: C.SET_PROFILE_NAME_DATA,
        payload: {
            getting: true,
            errorMsg: ''
        }
    });

    fetchUrl('URL_PROFILE')
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: C.SET_PROFILE_NAME_DATA,
                payload: { getting: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_PROFILE_NAME_DATA,
                    payload: { errorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_PROFILE_NAME_DATA,
                payload: {
                    name: data.UsrName,
                    singleMsg: data.SingleMsg
                }
            });
        });
};

export const updateProfileName = () => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_PROFILE_NAME_DATA,
        payload: {
            updating: true,
            errorMsg: ''
        }
    });

    let formData = new FormData();
    formData.append('UsrName', state.profile_name.name);
    formData.append('SingleMsg', state.profile_name.singleMsg ? 'true' : 'false');

    fetchUrl('URL_PROFILE', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: C.SET_PROFILE_NAME_DATA,
                payload: { updating: false }
            });
            if (!data.Success) {
                dispatch({
                    type: C.SET_PROFILE_NAME_DATA,
                    payload: { errorMsg: data.Error }
                });
            }
        });
};
