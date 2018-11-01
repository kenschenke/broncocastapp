import { getBroadcasts, showBroadcastDetail } from '../actions/myBroadcastsActions';

export const mapMyBroadcastsProps = state => {
    // Make a copy of the broadcasts
    const broadcasts = [...state.user_broadcasts.broadcasts];
    // Sort by timestamp descending
    broadcasts.sort((b1, b2) => {
        if (b1.Timestamp > b2.Timestamp) {
            return -1;
        } else if (b1.Timestamp < b2.Timestamp) {
            return 1;
        } else {
            return 0;
        }
    });

    return {
        broadcasts: broadcasts,
        errorMsg: state.user_broadcasts.errorMsg,
        fetching: state.user_broadcasts.fetching
    };
};

export const mapMyBroadcastsDispatch = dispatch => {
    return {
        broadcastPressed(broadcastId, navigation) {
            dispatch(showBroadcastDetail(broadcastId, navigation));
        },

        init() {
            dispatch(getBroadcasts());
        }
    };
};
