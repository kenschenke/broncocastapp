import C from '../contants';
import { getUserOrgs } from '../actions/profileOrgsActions';
import { addOrg, removeOrg } from '../actions/profileOrgsActions';

export const mapProfileOrgsProps = state => {
    return {
        orgs: state.profile_orgs.orgs,
        errorMsg: state.profile_orgs.errorMsg,
        fetching: state.profile_orgs.fetching,
        isValid: state.profile_orgs.isValid,
        joinTag: state.profile_orgs.joinTag
    };
};

export const mapProfileOrgsDispatch = dispatch => {
    return {
        init() {
            dispatch({
                type: C.SET_PROFILE_ORGS_DATA,
                payload: { joinTag: '' }
            });

            dispatch(getUserOrgs());
        },

        joinPressed() {
            dispatch(addOrg());
        },

        joinTagChanged(joinTag) {
            dispatch({
                type: C.SET_PROFILE_ORGS_DATA,
                payload: { joinTag }
            });
        },

        removeOrg(MemberId) {
            dispatch(removeOrg(MemberId));
        }
    };
};
