import C from '../contants';
import { fetchUrl } from '../helpers';

export const adminOrgChanged = () => dispatch => {
    dispatch(getUsers());
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
        const { MemberId, UsrName } = users[0];
        dispatch({
            type: C.SET_ADMIN_USER_DETAIL_DATA,
            payload: {
                memberId: MemberId,
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

    setTimeout(() => {
        dispatch({
            type: C.SET_ADMIN_USER_DETAIL_DATA,
            payload: {
                updatingUserName: false,
                updatingUserNameDone: true
            }
        });

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
    }, 2000);
};
