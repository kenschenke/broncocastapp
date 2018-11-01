import C from '../contants';
import { fetchUrl } from '../helpers';

export const addOrg = () => (dispatch, getState) => {
    const state = getState();
    const tag = state.profile_orgs.joinTag.trim();

    if (!tag.length) {
        dispatch({
            type: C.SET_PROFILE_ORGS_DATA,
            payload: {
                isValid: false,
                errorMsg: 'Organization tag cannot be empty'
            }
        });
        return;
    }

    let formData = new FormData();
    formData.append('Tag', tag);

    fetchUrl(C.URL_USERORGS, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to join organization');
            }
        })
        .then(data => {
            if (!data.Success) {
                dispatch({
                    type: C.SET_PROFILE_ORGS_DATA,
                    payload: { errorMsg: data.Error, isValid: false }
                });
                return;
            }

            dispatch({
                type: C.SET_PROFILE_ORGS_DATA,
                payload: {
                    isValid: true,
                    errorMsg: '',
                    joinTag: '',
                    orgs: [...state.profile_orgs.orgs, {
                        MemberId: data.MemberId,
                        OrgId: data.OrgId,
                        OrgName: data.OrgName,
                        IsAdmin: data.IsSystemAdmin
                    }]
                }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_PROFILE_ORGS_DATA,
                payload: { errorMsg: Error.message, isValid: false }
            });
        });
};

export const getUserOrgs = () => dispatch => {
    dispatch({
        type: C.SET_PROFILE_ORGS_DATA,
        payload: { orgs: [], adminOrgs: [], fetching: true }
    });

    fetchUrl(C.URL_USERORGS)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to retrieve organizations');
            }
        })
        .then(data => {
            dispatch({
                type: C.SET_PROFILE_ORGS_DATA,
                payload: { fetching: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_PROFILE_ORGS_DATA,
                    payload: { errorMsg: data.Error, isValid: false }
                });
                return;
            }

            dispatch({
                type: C.SET_PROFILE_ORGS_DATA,
                payload: { orgs: data.Orgs, adminOrgs: data.AdminOrgs, isValid: true }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_PROFILE_ORGS_DATA,
                payload: { fetching: false, isValid: false, errorMsg: Error.message }
            });
        });
};


export const removeOrg = MemberId => (dispatch, getState) => {
    const state = getState();

    fetchUrl(`${C.URL_USERORGS}/${MemberId}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Unable to drop organization');
            }
        })
        .then(data => {
            if (!data.Success) {
                dispatch({
                    type: C.SET_PROFILE_ORGS_DATA,
                    payload: { errorMsg: data.Error, isValid: false }
                });
                return;
            }

            dispatch({
                type: C.SET_PROFILE_ORGS_DATA,
                payload: {
                    isValid: true,
                    orgs: state.profile_orgs.orgs.filter(org => org.MemberId !== MemberId)
                }
            });
        })
        .catch(Error => {
            dispatch({
                type: C.SET_PROFILE_ORGS_DATA,
                payload: { fetching: false, isValid: false, errorMsg: Error.message }
            });
        });
};
