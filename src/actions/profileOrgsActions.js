import C from '../contants';
import { fetchUrl } from '../helpers';

export const addOrg = () => (dispatch, getState) => {
    const state = getState();
    const tag = state.profile_orgs.joinTag.trim();

    if (!tag.length) {
        dispatch({
            type: C.SET_PROFILE_ORGS_DATA,
            payload: {
                addOrgFailed: true,
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
        .then(response => response.json())
        .then(data => {
            if (!data.Success) {
                dispatch({
                    type: C.SET_PROFILE_ORGS_DATA,
                    payload: { errorMsg: data.Error, addOrgFailed: true }
                });
                return;
            }

            dispatch({
                type: C.SET_PROFILE_ORGS_DATA,
                payload: {
                    addOrgFailed: false,
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
        });
};

export const getUserOrgs = () => dispatch => {
    dispatch({
        type: C.SET_PROFILE_ORGS_DATA,
        payload: { orgs: [], adminOrgs: [], fetching: true }
    });

    fetchUrl(C.URL_USERORGS)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: C.SET_PROFILE_ORGS_DATA,
                payload: { fetching: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_PROFILE_ORGS_DATA,
                    payload: { errorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_PROFILE_ORGS_DATA,
                payload: { orgs: data.Orgs, adminOrgs: data.AdminOrgs }
            });
        });
};


export const removeOrg = MemberId => (dispatch, getState) => {
    const state = getState();

    fetchUrl(`${C.URL_USERORGS}/${MemberId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            if (!data.Success) {
                dispatch({
                    type: C.SET_PROFILE_ORGS_DATA,
                    payload: { errorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_PROFILE_ORGS_DATA,
                payload: {
                    orgs: state.profile_orgs.orgs.filter(org => org.MemberId !== MemberId)
                }
            });
        });
};
