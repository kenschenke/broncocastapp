import C from '../contants';
import { fetchUrl } from '../helpers';

export const getProfileContacts = () => dispatch => {
    dispatch({
        type: C.SET_PROFILE_CONTACTS_DATA,
        payload: {
            contacts: [],
            fetching: true,
            errorMsg: ''
        }
    });

    fetchUrl('URL_CONTACTS')
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: C.SET_PROFILE_CONTACTS_DATA,
                payload: { fetching: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_PROFILE_CONTACTS_DATA,
                    payload: { errorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_PROFILE_CONTACTS_DATA,
                payload: { contacts: data.Contacts }
            });
        });
};

