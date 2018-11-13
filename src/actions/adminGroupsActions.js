import C from '../contants';
import { fetchUrl, fetchUrlError } from '../helpers';

export const adminOrgChanged = () => dispatch => {
    dispatch(getGroups());
};

export const addGroup = navigation => (dispatch, getState) => {
    const state = getState();

    const name = state.admin_groups.newGroupName.trim();
    if (!name.length) {
        dispatch({
            type: C.SET_ADMIN_GROUPS_DATA,
            payload: { newGroupErrorMsg: 'A name is required' }
        });
        return;
    }

    dispatch({
        type: C.SET_ADMIN_GROUPS_DATA,
        payload: { addingGroup: true }
    });

    let formData = new FormData();
    formData.append('Name', name);

    fetchUrl(`${C.URL_ADMIN_GROUPS}/${state.admin_org.orgId}`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to add new group');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_GROUPS_DATA,
                payload: { addingGroup: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_GROUPS_DATA,
                    payload: { newGroupErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_GROUPS_DATA,
                payload: {
                    groups: [...state.admin_groups.groups, {
                        GroupId: data.GroupId,
                        GroupName: name
                    }]
                }
            });

            navigation.goBack();
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_GROUPS_DATA,
                payload: { addingGroup: false, newGroupErrorMsg: Error.message }
            });
        });
};

export const deleteGroup = navigation => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_ADMIN_GROUP_DETAIL_DATA,
        payload: { deletingGroup: true, deletingGroupErrorMsg: '' }
    });

    fetchUrl(`${C.URL_ADMIN_GROUPS_REMOVE}/${state.admin_group_detail.groupId}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to delete group');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { deletingGroup: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                    payload: { deletingGroupErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_GROUPS_DATA,
                payload: {
                    groups: state.admin_groups.groups.filter(group => group.GroupId !== state.admin_group_detail.groupId)
                }
            });

            navigation.goBack();
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { deletingGroup: false, deletingGroupErrorMsg: Error.message }
            });
        });
};

export const getGroupMembers = () => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_ADMIN_GROUP_DETAIL_DATA,
        payload: { fetchingMembers: true, members: [], fetchingMembersErrorMsg: '' }
    });

    fetchUrl(`${C.URL_ADMIN_GROUP_MEMBERS}/${state.admin_group_detail.groupId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to retrieve group members');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { fetchingMembers: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                    payload: { fetchingMembersErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { members: data.Members }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { fetchingMembers: false, fetchingMembersErrorMsg: Error.message }
            });
        });
};

export const getGroups = () => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_ADMIN_GROUPS_DATA,
        payload: { groups: [], fetching: true }
    });

    fetchUrl(`${C.URL_ADMIN_GROUPS}/${state.admin_org.orgId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to retrieve groups');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_GROUPS_DATA,
                payload: { fetching: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_GROUPS_DATA,
                    payload: { errorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_GROUPS_DATA,
                payload: { groups: data.Groups }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_GROUPS_DATA,
                payload: { fetching: false, errorMsg: Error.message }
            });
        });
};

