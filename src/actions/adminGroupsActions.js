import C from '../contants';
import { fetchUrl } from '../helpers';

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

export const addMember = (UserId, UserName) => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_ADMIN_GROUP_DETAIL_DATA,
        payload: {
            addingMember: true,
            addingMemberErrorMsg: '',
            addingMemberUserId: UserId
        }
    });

    let formData = new FormData();
    formData.append('UserId', UserId);

    fetchUrl(`${C.URL_ADMIN_GROUP_MEMBERS}/${state.admin_group_detail.groupId}`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to add group member');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { addingMember: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                    payload: { addingMemberErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: {
                    members: [...state.admin_group_detail.members, {
                        MemberId: data.MemberId,
                        UserId: UserId,
                        UserName: UserName
                    }],
                    nonMembers: state.admin_group_detail.nonMembers.filter(user => user.UserId !== UserId)
                }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { addingMember: false, addingMemberErrorMsg: Error.message }
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

export const getGroupNonMembers = () => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_ADMIN_GROUP_DETAIL_DATA,
        payload: { fetchingNonMembers: true, nonMembers: [], fetchingNonMembersErrorMsg: '' }
    });

    fetchUrl(`${C.URL_ADMIN_GROUP_NONMEMBERS}/${state.admin_group_detail.groupId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to retrieve non group members');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { fetchingNonMembers: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                    payload: { fetchingNonMembersErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { nonMembers: data.NonMembers }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { fetchingNonMembers: false, fetchingNonMembersErrorMsg: Error.message }
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

export const removeMember = (MemberId, UserId, UserName) => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_ADMIN_GROUP_DETAIL_DATA,
        payload: { removingMember: true, removingMemberErrorMsg: '', removingMemberId: MemberId }
    });

    fetchUrl(`${C.URL_ADMIN_GROUP_MEMBERS}/${MemberId}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to remove group member');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { removingMember: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                    payload: { removingMemberErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: {
                    nonMembers: [...state.admin_group_detail.nonMembers, {
                        UserId: UserId,
                        UserName: UserName
                    }],
                    members: state.admin_group_detail.members.filter(member => member.MemberId !== MemberId)
                }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { removingMember: false, removingMemberErrorMsg: Error.message }
            });
        });
};

export const renameGroup = navigation => (dispatch, getState) => {
    const state = getState();

    const name = state.admin_group_detail.renamingGroupName.trim();
    if (!name.length) {
        dispatch({
            type: C.SET_ADMIN_GROUP_DETAIL_DATA,
            payload: { renamingErrorMsg: 'A name is required' }
        });
        return;
    }

    dispatch({
        type: C.SET_ADMIN_GROUP_DETAIL_DATA,
        payload: { renamingGroup: true, renamingErrorMsg: '' }
    });

    let formData = new FormData();
    formData.append('Name', name);

    fetchUrl(`${C.URL_ADMIN_GROUP_RENAME}/${state.admin_group_detail.groupId}`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to rename group');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { renamingGroup: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                    payload: { renamingErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { groupName: name }
            });

            dispatch({
                type: C.SET_ADMIN_GROUPS_DATA,
                payload: {
                    groups: state.admin_groups.groups.map(group => {
                        return {
                            ...group,
                            GroupName: group.GroupId === state.admin_group_detail.groupId ? name : group.GroupName
                        };
                    })
                }
            });

            navigation.goBack();
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_GROUP_DETAIL_DATA,
                payload: { renamingGroup: false, renamingErrorMsg: Error.message }
            });
        });
};

export const showRenameGroupScreen = navigation => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_ADMIN_GROUP_DETAIL_DATA,
        payload: {
            renamingGroup: false,
            renamingErrorMsg: '',
            renamingGroupName: state.admin_group_detail.groupName
        }
    });

    navigation.push('AdminRenameGroup');
};

