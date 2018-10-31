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

    fetchUrl(C.URL_PROFILE)
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

    const name = state.profile_name.name.trim();
    if (!name.length) {
        dispatch({
            type: C.SET_PROFILE_NAME_DATA,
            payload: { errorMsg: 'A name is required' }
        });
        return;
    }

    dispatch({
        type: C.SET_PROFILE_NAME_DATA,
        payload: {
            updating: true,
            errorMsg: ''
        }
    });

    let formData = new FormData();
    formData.append('UsrName', name);
    formData.append('SingleMsg', state.profile_name.singleMsg ? 'true' : 'false');

    fetchUrl(C.URL_PROFILE, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: C.SET_PROFILE_NAME_DATA,
                payload: { updating: false, saved: true }
            });
            if (!data.Success) {
                dispatch({
                    type: C.SET_PROFILE_NAME_DATA,
                    payload: { errorMsg: data.Error }
                });
            }
        });
};
