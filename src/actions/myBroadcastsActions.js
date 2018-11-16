import C from '../contants';
import { fetchUrl, fetchUrlError } from '../helpers';

export const getBroadcasts = () => dispatch => {
    dispatch({
        type: C.SET_USER_BROADCASTS_DATA,
        payload: { fetching: true, broadcasts: [] }
    });

    fetchUrl(C.URL_USER_BROADCASTS)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to retrieve broadcasts');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_USER_BROADCASTS_DATA,
                payload: { fetching: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_USER_BROADCASTS_DATA,
                    payload: { errorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_USER_BROADCASTS_DATA,
                payload: { broadcasts: data.Broadcasts }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_USER_BROADCASTS_DATA,
                payload: { fetching: false, errorMsg: Error.message }
            });
        });
};

export const showBroadcastDetail = (broadcastId, navigation) => (dispatch, getState) => {
    const state = getState();
    const b = state.user_broadcasts.broadcasts.filter(broadcast => broadcast.BroadcastId === broadcastId);
    if (b.length !== 1) {
        return;
    }

    dispatch({
        type: C.SET_BROADCAST_DETAIL_DATA,
        payload: {
            sentBy: b[0].UsrName,
            isDelivered: true,
            time: b[0].Delivered,
            shortMsg: b[0].ShortMsg,
            longMsg: b[0].LongMsg,
            recipients: []
        }
    });

    navigation.push('BroadcastDetail');
};
