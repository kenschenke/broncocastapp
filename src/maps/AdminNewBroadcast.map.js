import C from '../contants';
import { sendBroadcast } from '../actions/adminBroadcastsActions';

export const mapAdminNewBroadcastProps = state => {
    const maxShortMsg = 127;
    const maxLongMsg = 2048;

    let shortMsgInputContext = 'neutral';
    let shortMsgHelpText = '';
    const shortMsg = state.admin_broadcasts.shortMsg.trim();
    if (!shortMsg.length && !state.admin_broadcasts.shortMsgPristine) {
        shortMsgHelpText = 'A short message is required';
        shortMsgInputContext = 'error';
    }
    else if (shortMsg.length <= maxShortMsg) {
        shortMsgHelpText = `${maxShortMsg - shortMsg.length} character${shortMsg.length + 1 !== maxShortMsg ? 's' : ''} left`;
    } else {
        shortMsgHelpText = `${shortMsg.length - maxShortMsg} character${shortMsg.length - 1 !== maxShortMsg ? 's' : ''} too many`;
        shortMsgInputContext = 'error';
    }

    let longMsgInputContext = 'neutral';
    let longMsgHelpText = '';
    const longMsg = state.admin_broadcasts.longMsg.trim();
    if (longMsg.length <= maxLongMsg) {
        longMsgHelpText = `${maxLongMsg - longMsg.length} character${longMsg.length + 1 !== maxLongMsg ? 's' : ''} left`;
    } else {
        longMsgHelpText = `${longMsg.length - maxLongMsg} character${longMsg.length - 1 !== maxLongMsg ? 's' : ''} too many`;
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
