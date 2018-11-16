import React from 'react';
import PropTypes from 'prop-types';
import { mapAdminNewBroadcastProps, mapAdminNewBroadcastDispatch } from '../maps/AdminNewBroadcast.map';
import { connect } from 'react-redux';
import { Alert, ScrollView, Text } from 'react-native';
import { Input } from '../components';
import { Button } from 'react-native-elements';
import { AdminBroadcastRecipients } from '../components/AdminBroadcastRecipients';

const AdminNewBroadcastUi = props => {
    const renderErrorMsg = () => {
        if (!props.sendBroadcastErrorMsg.length) {
            return null;
        }

        return (
            <Text style={styles.ErrorMsgStyle}>{props.sendBroadcastErrorMsg}</Text>
        );
    };

    const sendBroadcast = () => {
        if (props.shortMsgInputContext !== 'neutral' || props.longMsgInputContext !== 'neutral') {
            Alert.alert('Problem', 'The broadcast message is too long');
            return;
        }

        props.sendBroadcastPressed(props.navigation);
    };

    return (
        <ScrollView style={styles.TopLevelStyle}>
            <Input
                label="Short Message"
                multiline={true}
                placeholder="Type short message here"
                value={props.shortMsg}
                onChangeText={props.shortMsgChanged}
                helpText={props.shortMsgHelpText}
                validContext={props.shortMsgInputContext}
            />
            <Input
                label="Long Message"
                multiline={true}
                placeholder="Type long message here (optional)"
                value={props.longMsg}
                onChangeText={props.longMsgChanged}
                helpText={props.longMsgHelpText}
                validContext={props.longMsgInputContext}
            />

            <AdminBroadcastRecipients/>

            {renderErrorMsg()}

            <Button
                borderRadius={5}
                color={props.sendingBroadcast ? '#999' : '#fff'}
                backgroundColor={props.sendingBroadcast ? '#ccc' : '#006fce'}
                disabled={props.sendingBroadcast}
                containerViewStyle={{ flex: 1 }}
                title={props.sendingBroadcast ? 'Sending Broadcast' : 'Send Broadcast'}
                fontWeight="600"
                onPress={sendBroadcast}
                loading={props.sendingBroadcast}
                loadingRight={true}
            />
        </ScrollView>
    );
};

const styles = {
    ErrorMsgStyle: {
        fontSize: 18,
        color: '#cf272a'
    },

    TopLevelStyle: {
        backgroundColor: '#fff',
        padding: 5
    }
};

AdminNewBroadcastUi.propTypes = {
    longMsg: PropTypes.string.isRequired,
    longMsgInputContext: PropTypes.string.isRequired,
    longMsgHelpText: PropTypes.string.isRequired,
    shortMsg: PropTypes.string.isRequired,
    shortMsgInputContext: PropTypes.string.isRequired,
    shortMsgHelpText: PropTypes.string.isRequired,
    sendBroadcastErrorMsg: PropTypes.string.isRequired,
    sendingBroadcast: PropTypes.bool.isRequired,

    shortMsgChanged: PropTypes.func.isRequired,
    longMsgChanged: PropTypes.func.isRequired,
    sendBroadcastPressed: PropTypes.func.isRequired
};

export const AdminNewBroadcast = connect(mapAdminNewBroadcastProps, mapAdminNewBroadcastDispatch)(AdminNewBroadcastUi);

AdminNewBroadcast.navigationOptions = {
    title: 'New Broadcast'
};
