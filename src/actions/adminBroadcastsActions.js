import C from '../contants';
import { fetchUrl, fetchUrlError } from '../helpers';

export const adminOrgChanged = () => dispatch => {
    dispatch(getBroadcasts());
};

export const getBroadcasts = () => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_ADMIN_BROADCASTS_DATA,
        payload: { fetching: true, errorMsg: '' }
    });

    fetchUrl(`${C.URL_ADMIN_BROADCASTS}/${state.admin_org.orgId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to retrieve broadcasts');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_BROADCASTS_DATA,
                payload: { fetching: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_BROADCASTS_DATA,
                    payload: { errorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_BROADCASTS_DATA,
                payload: { broadcasts: data.Broadcasts }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_BROADCASTS_DATA,
                payload: { fetching: false, errorMsg: Error.message }
            });
        });
};

export const getGroupMemberships = () => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_ADMIN_BROADCASTS_DATA,
        payload: { fetchingGroups: true, fetchingGroupsErrorMsg: '' }
    });

    fetchUrl(`${C.URL_ADMIN_BROADCASTS_GROUPS}/${state.admin_org.orgId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to retrieve groups');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_BROADCASTS_DATA,
                payload: { fetchingGroups: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_BROADCASTS_DATA,
                    payload: { fetchingGroupsErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_BROADCASTS_DATA,
                payload: { groups: data.Groups }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_BROADCASTS_DATA,
                payload: { fetchingGroups: false, fetchingGroupsErrorMsg: Error.message }
            });
        });
};

export const selectEveryone = () => (dispatch, getState) => {
    const state = getState();
    let selected = [];

    for (let group in state.admin_broadcasts.groups) {
        if (state.admin_broadcasts.groups.hasOwnProperty(group)) {
            for (let i = 0; i < state.admin_broadcasts.groups[group].length; i++) {
                if (selected.indexOf(state.admin_broadcasts.groups[group][i].UserId) === -1) {
                    selected.push(state.admin_broadcasts.groups[group][i].UserId);
                }
            }
        }
    }

    dispatch({
        type: C.SET_ADMIN_BROADCASTS_DATA,
        payload: { selectedUsers: selected }
    });
};

export const selectGroupMembers = Members => (dispatch, getState) => {
    const state = getState();

    const newSelected = [...state.admin_broadcasts.selectedUsers];
    for (let i = 0; i < Members.length; i++) {
        if (newSelected.indexOf(Members[i]) === -1) {
            newSelected.push(Members[i]);
        }
    }

    dispatch({
        type: C.SET_ADMIN_BROADCASTS_DATA,
        payload: { selectedUsers: newSelected }
    });
};

export const sendBroadcast = navigation => (dispatch, getState) => {
    const state = getState();

    const shortMsg = state.admin_broadcasts.shortMsg.trim();
    if (!shortMsg.length) {
        dispatch({
            type: C.SET_ADMIN_BROADCASTS_DATA,
            payload: {
                shortMsgPristine: false,
                sendBroadcastErrorMsg: 'A short message is required'
            }
        });
        return;
    }

    if (state.admin_broadcasts.selectedUsers.length < 1) {
        dispatch({
            type: C.SET_ADMIN_BROADCASTS_DATA,
            payload: { sendBroadcastErrorMsg: 'At least 1 recipient must be selected' }
        });
        return;
    }

    dispatch({
        type: C.SET_ADMIN_BROADCASTS_DATA,
        payload: { sendingBroadcast: true, sendBroadcastErrorMsg: '' }
    });

    let formData = new FormData();
    formData.append('ShortMsg', shortMsg);
    formData.append('LongMsg', state.admin_broadcasts.longMsg.trim());
    formData.append('Recipients', state.admin_broadcasts.selectedUsers.join(','));

    fetchUrl(`${C.URL_ADMIN_BROADCASTS_NEW}/${state.admin_org.orgId}`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to queue new broadcast');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_BROADCASTS_DATA,
                payload: { sendingBroadcast: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_BROADCASTS_DATA,
                    payload: { sendBroadcastErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_BROADCASTS_DATA,
                payload: {
                    broadcasts: [
                        ...state.admin_broadcasts.broadcasts,
                        {
                            BroadcastId: data.BroadcastId,
                            ShortMsg: data.ShortMsg,
                            LongMsg: data.LongMsg,
                            Time: data.Time,
                            Timestamp: data.Timestamp,
                            IsDelivered: data.IsDelivered,
                            UsrName: data.UsrName,
                            AttachmentUrl: '',
                            Recipients: data.Recipients,
                        }
                    ]
                }
            });

            navigation.goBack();
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_BROADCASTS_DATA,
                payload: { sendingBroadcast: false, sendBroadcastErrorMsg: Error.message }
            });
        });
};

export const showBroadcastDetail = (broadcastId, navigation) => (dispatch, getState) => {
    const state = getState();
    const b = state.admin_broadcasts.broadcasts.filter(broadcast => broadcast.BroadcastId === broadcastId);
    if (b.length !== 1) {
        return;
    }

    dispatch({
        type: C.SET_BROADCAST_DETAIL_DATA,
        payload: {
            sentBy: b[0].UsrName,
            time: b[0].Time,
            isDelivered: b[0].IsDelivered,
            shortMsg: b[0].ShortMsg,
            longMsg: b[0].LongMsg,
            recipients: b[0].Recipients
        }
    });

    navigation.push('BroadcastDetail');
};

export const showNewBroadcast = navigation => dispatch => {
    dispatch({
        type: C.SET_ADMIN_BROADCASTS_DATA,
        payload: {
            // shortMsg: '',
            // shortMsgPristine: true,
            shortMsg: 'abc',
            shortMsgPristine: false,
            longMsg: '',
            fetchingGroups: false,
            fetchingGroupsErrorMsg: '',
            groups: {},
            selectedUsers: [],
            sendingBroadcast: false,
            sendBroadcastErrorMsg: ''
        }
    });
    dispatch(getGroupMemberships());
    navigation.push('AdminNewBroadcast');
};

export const toggleUserSelected = UserId => (dispatch, getState) => {
    const state = getState();

    if (state.admin_broadcasts.selectedUsers.indexOf(UserId) !== -1) {
        // user is currently selected - remove them
        dispatch({
            type: C.SET_ADMIN_BROADCASTS_DATA,
            payload: {
                selectedUsers: state.admin_broadcasts.selectedUsers.filter(id => id !== UserId)
            }
        });
    } else {
        // user is not currently selected - add them
        dispatch({
            type: C.SET_ADMIN_BROADCASTS_DATA,
            payload: {
                selectedUsers: [...state.admin_broadcasts.selectedUsers, UserId]
            }
        });
    }
};

export const unselectGroupMembers = Members => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_ADMIN_BROADCASTS_DATA,
        payload: {
            selectedUsers: state.admin_broadcasts.selectedUsers.filter(member => Members.indexOf(member) === -1)
        }
    });
};
