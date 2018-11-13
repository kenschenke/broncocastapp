import C from '../contants';

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

