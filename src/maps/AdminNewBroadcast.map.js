import C from '../contants';
import { sendBroadcast } from '../actions/adminBroadcastsActions';

export const mapAdminNewBroadcastProps = state => {
    let shortMsgInputContext = 'neutral';
    let shortMsgHelpText = '';
    const shortMsg = state.admin_broadcasts.shortMsg.trim();
    if (!shortMsg.length && !state.admin_broadcasts.shortMsgPristine) {
        shortMsgHelpText = 'A short message is required';
        shortMsgInputContext = 'error';
    }
    else if (shortMsg.length <= 140) {
        shortMsgHelpText = `${140 - shortMsg.length} character${shortMsg.length + 1 !== 140 ? 's' : ''} left`;
    } else {
        shortMsgHelpText = `${shortMsg.length - 140} character${shortMsg.length - 1 !== 140 ? 's' : ''} too many`;
        shortMsgInputContext = 'error';
    }

    let longMsgInputContext = 'neutral';
    let longMsgHelpText = '';
    const longMsg = state.admin_broadcasts.longMsg.trim();
    if (longMsg.length <= 2048) {
        longMsgHelpText = `${2048 - longMsg.length} character${longMsg.length + 1 !== 2048 ? 's' : ''} left`;
    } else {
        longMsgHelpText = `${longMsg.length - 2048} character${longMsg.length - 1 !== 2048 ? 's' : ''} too many`;
        longMsgInputContext = 'error';
    }

    return {
        shortMsg,
        shortMsgHelpText,
        shortMsgInputContext,
        longMsg,
        longMsgHelpText,
        longMsgInputContext,
        sendingBroadcast: state.admin_broadcasts.sendingBroadcast,
        sendBroadcastErrorMsg: state.admin_broadcasts.sendBroadcastErrorMsg
    };
};

export const mapAdminNewBroadcastDispatch = dispatch => {
    return {
        longMsgChanged(longMsg) {
            dispatch({
                type: C.SET_ADMIN_BROADCASTS_DATA,
                payload: { longMsg }
            });
        },

        sendBroadcastPressed(navigation) {
            dispatch(sendBroadcast(navigation));
        },

        shortMsgChanged(shortMsg) {
            dispatch({
                type: C.SET_ADMIN_BROADCASTS_DATA,
                payload: { shortMsg, shortMsgPristine: false }
            });
        }
    };
};
