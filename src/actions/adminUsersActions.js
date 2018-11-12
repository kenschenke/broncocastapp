import C from '../contants';
import { fetchUrl } from '../helpers';

export const addRemoveAdmin = () => (dispatch, getState) => {
    const state = getState();

    const { isAdmin, memberId } = state.admin_user_detail;

    dispatch({
        type: C.SET_ADMIN_USER_DETAIL_DATA,
        payload: { adminWorking: true, adminErrorMsg: '' }
    });

    fetchUrl(`${C.URL_ADMIN_USERS_ADMIN}/${memberId}`, { method: isAdmin ? 'DELETE' : 'PUT' })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to add / remove admin');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: { adminWorking: false }
            });
            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_USER_DETAIL_DATA,
                    payload: { adminErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: { isAdmin: !isAdmin }
            });

            dispatch({
                type: C.SET_ADMIN_USERS_DATA,
                payload: {
                    users: state.admin_users.users.map(user => {
                        return {
                            ...user,
                            IsAdmin: user.MemberId === memberId ? !isAdmin : user.IsAdmin
                        };
                    })
                }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: {
                    adminWorking: false,
                    adminErrorMsg: Error.message
                }
            });
        });
};

export const adminOrgChanged = () => dispatch => {
    dispatch(getUsers());
};

export const approveUser = () => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_ADMIN_USER_DETAIL_DATA,
        payload: { approving: true, approvingErrorMsg: '' }
    });

    fetchUrl(`${C.URL_ADMIN_USERS_APPROVE}/${state.admin_user_detail.memberId}`, {
        method: 'PUT'
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to approve user');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: { approving: false }
            });
            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_USER_DETAIL_DATA,
                    payload: { approvingErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: { isApproved: true }
            });

            dispatch({
                type: C.SET_ADMIN_USERS_DATA,
                payload: {
                    users: state.admin_users.users.map(user => {
                        return {
                            ...user,
                            Approved: user.MemberId === state.admin_user_detail.memberId ? true : user.Approved
                        };
                    })
                }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: {
                    approving: false,
                    approvingErrorMsg: Error.message
                }
            });
        });
};

export const dropUser = navigation => (dispatch, getState) => {
    const state = getState();

    const { memberId } = state.admin_user_detail;

    dispatch({
        type: C.SET_ADMIN_USER_DETAIL_DATA,
        payload: { droppingUser: true, droppingUserErrorMsg: '' }
    });

    fetchUrl(`${C.URL_ADMIN_USERS_REMOVE}/${memberId}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to remove user');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: { droppingUser: false }
            });
            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_USER_DETAIL_DATA,
                    payload: { droppingUserErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_USERS_DATA,
                payload: {
                    users: state.admin_users.users.filter(user => user.MemberId !== memberId)
                }
            });

            navigation.goBack();
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: {
                    droppingUser: false,
                    droppingUserErrorMsg: Error.message
                }
            });
        });
};

export const getUsers = () => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_ADMIN_USERS_DATA,
        payload: {
            users: [],
            fetching: true
        }
    });

    fetchUrl(`${C.URL_ADMIN_USERS}/${state.admin_org.orgId}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Unable to retrieve users');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_USERS_DATA,
                payload: { fetching: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_USERS_DATA,
                    payload: { errorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_USERS_DATA,
                payload: { users: data.Users }
            });
        }).catch(Error => {
            dispatch({
                type: C.SET_ADMIN_USERS_DATA,
                payload: { fetching: false, errorMsg: Error.message }
            });
    });
};

export const hideUnhideUser = () => (dispatch, getState) => {
    const state = getState();

    const { isHidden, memberId } = state.admin_user_detail;
    const urlHide = C.URL_ADMIN_USERS_HIDE;
    const urlUnhide = C.URL_ADMIN_USERS_UNHIDE;
    const url = `${isHidden ? urlUnhide : urlHide}/${memberId}`;

    dispatch({
        type: C.SET_ADMIN_USER_DETAIL_DATA,
        payload: { hiding: true, hidingErrorMsg: '' }
    });

    fetchUrl(url, { method: 'PUT' })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to hide/unhide user');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: { hiding: false }
            });
            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_USER_DETAIL_DATA,
                    payload: { hidingErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: {
                    hiding: false,
                    isHidden: !isHidden
                }
            });

            dispatch({
                type: C.SET_ADMIN_USERS_DATA,
                payload: {
                    users: state.admin_users.users.map(user => {
                        return {
                            ...user,
                            Hidden: user.MemberId === memberId ? !isHidden : user.Hidden
                        };
                    })
                }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: {
                    hiding: false,
                    hidingErrorMsg: Error.message
                }
            });
        });
};

export const setAdminOrgId = orgId => (dispatch, getState) => {
    const state = getState();

    const orgs = state.admin_org.adminOrgs.filter(org => org.OrgId === orgId);
    if (orgs.length !== 1) {
        return;
    }

    dispatch({
        type: C.SET_ADMIN_ORG_DATA,
        payload: {
            orgId: orgId,
            orgName: orgs[0].OrgName
        }
    });
};

export const setUserDetail = usrId => (dispatch, getState) => {
    const state = getState();

    const users = state.admin_users.users.filter(user => user.UsrId === usrId);
    if (users.length === 1) {
        const { Approved, Contacts, Hidden, IsAdmin, MemberId, SmsLogs, UsrName } = users[0];
        dispatch({
            type: C.SET_ADMIN_USER_DETAIL_DATA,
            payload: {
                adminWorking: false,
                adminErrorMsg: '',
                approving: false,
                approvingErrorMsg: '',
                contacts: Contacts,
                droppingUser: false,
                droppingUserErrorMsg: '',
                hiding: false,
                hidingErrorMsg: '',
                isAdmin: IsAdmin,
                isApproved: Approved,
                isHidden: Hidden,
                memberId: MemberId,
                smsLogs: SmsLogs,
                updatingUserName: false,
                updatingUserNameDone: false,
                userId: usrId,
                userName: UsrName,
                userNameErrorMsg: ''
            }
        });
    }
};

export const updateUserName = () => (dispatch, getState) => {
    const state = getState();

    const name = state.admin_user_detail.userName.trim();
    if (!name.length) {
        dispatch({
            type: C.SET_ADMIN_USER_DETAIL_DATA,
            payload: {
                userNameErrorMsg: 'A name is required'
            }
        });
        return;
    }

    dispatch({
        type: C.SET_ADMIN_USER_DETAIL_DATA,
        payload: { updatingUserName: true }
    });

    let formData = new FormData();
    formData.append('Name', name);

    fetchUrl(`${C.URL_ADMIN_USERS_NAME}/${state.admin_user_detail.memberId}`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to update user name');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: {
                    updatingUserName: false,
                    updatingUserNameDone: true
                }
            });
            if (!data.Success) {
                dispatch({
                    type: C.SET_ADMIN_USER_DETAIL_DATA,
                    payload: { userNameErrorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_ADMIN_USERS_DATA,
                payload: {
                    users: state.admin_users.users.map(user => {
                        return {
                            ...user,
                            UsrName: user.UsrId === state.admin_user_detail.userId ? name : user.UsrName
                        };
                    })
                }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_ADMIN_USER_DETAIL_DATA,
                payload: {
                    updatingUserName: false,
                    updatingUserNameDone: true,
                    userNameErrorMsg: Error.message
                }
            });
        });
};
