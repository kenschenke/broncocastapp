import React from 'react';
import PropTypes from 'prop-types';
import { mapAdminUserDetailProps, mapAdminUserDetailDispatch } from '../maps/AdminUserDetail.map';
import { connect } from 'react-redux';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Input } from '../components';
import { Button } from 'react-native-elements';

const AdminUserDetailUi = props => {
    let userNameHelpText = '';
    let userNameContext = 'neutral';

    const {
        adminErrorStyle,
        approveErrorStyle,
        blockedHeaderStyle,
        blockedMessageContainerStyle,
        blockedMessageTimeStyle,
        blockedMessageTextStyle,
        buttonRowStyle,
        contactStyle,
        contactsHeaderStyle,
        droppingUserErrorStyle,
        hideUnhideErrorStyle,
        topLevelStyle
    } = styles;

    if (props.updatingUserName) {
        userNameHelpText = 'Updating';
    }
    else if (props.userNameErrorMsg.length) {
        userNameHelpText = props.userNameErrorMsg;
        userNameContext = 'error';
    }
    else if (props.updatingUserNameDone) {
        userNameHelpText = 'Changes saved';
    }

    const dropUserPressed = () => {
        Alert.alert(
            'Remove User',
            'Are you sure?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', style: 'destructive', onPress: () => props.dropUser(props.navigation) }
            ]
        );
    };

    const formatContact = contact => {
        if (contact.length === 10 && contact.indexOf(/[^0-9]/) === -1) {
            return '(' + contact.substr(0, 3) + ') ' + contact.substr(3, 3) + '-' + contact.substr(6);
        }

        return contact;
    };

    const renderAdminButton = () => {
        let title = '';
        if (props.isAdmin) {
            title = props.adminWorking ? 'Removing' : 'Remove Admin';
        } else {
            title = props.adminWorking ? 'Adding' : 'Add Admin';
        }
        return (
            <Button
                borderRadius={5}
                backgroundColor="#006fce"
                containerViewStyle={{ flex: 1 }}
                onPress={props.addRemoveAdmin}
                title={title}
                fontWeight="600"
                disabled={props.adminWorking}
                color={props.adminWorking ? '#999' : '#fff'}
                loading={props.adminWorking}
                loadingRight={true}
            />
        );
    };

    const renderAdminErrorMsg = () => {
        if (!props.adminErrorMsg.length) {
            return null;
        }

        return <Text style={adminErrorStyle}>{props.adminErrorMsg}</Text>;
    };

    const renderApproveButton = () => {
        if (props.isApproved) {
            return null;
        }

        return (
            <Button
                borderRadius={5}
                backgroundColor="#006fce"
                onPress={props.approveUser}
                title={props.approving ? 'Approving User' : 'Approve'}
                fontWeight="600"
                disabled={props.approving}
                color={props.approving ? '#999' : '#fff'}
                loading={props.approving}
                loadingRight={true}
            />
        );
    };

    const renderApproveErrorMsg = () => {
        if (!props.approvingErrorMsg.length) {
            return null;
        }

        return <Text style={approveErrorStyle}>{props.approvingErrorMsg}</Text>;
    };

    const renderContacts = () => {
        const contacts = props.contacts.map(contact => {
            return <Text style={contactStyle} key={contact.ContactId}>{formatContact(contact.Contact)}</Text>;
        });

        return (
            <View>
                <Text style={contactsHeaderStyle}>Contact Information</Text>
                {contacts}
            </View>
        );
    };

    const renderBlockedMessages = () => {
        if (!props.smsLogs.length) {
            return null;
        }

        const logs = props.smsLogs.map(log => {
            return (
                <View key={log.Time} style={blockedMessageContainerStyle}>
                    <Text style={blockedMessageTimeStyle}>{log.Time}</Text>
                    <Text style={blockedMessageTextStyle}>{log.Message}</Text>
                </View>
            );
        });

        return (
            <View>
                <Text style={blockedHeaderStyle}>Delivery Problems (Blocked Messages)</Text>
                {logs}
            </View>
        );
    };

    const renderDroppingUserErrorMsg = () => {
        if (!props.droppingUserErrorMsg.length) {
            return null;
        }

        return <Text style={droppingUserErrorStyle}>{props.droppingUserErrorMsg}</Text>;
    };

    const renderHideUnhideButton = () => {
        let title = '';
        if (props.isHidden) {
            title = props.hiding ? 'Unhiding User' : 'Unhide';
        } else {
            title = props.hiding ? 'Hiding User' : 'Hide';
        }
        return (
            <Button
                borderRadius={5}
                backgroundColor="#006fce"
                containerViewStyle={{ flex: 1 }}
                onPress={props.hideUnhide}
                title={title}
                fontWeight="600"
                disabled={props.hiding}
                color={props.hiding ? '#999' : '#fff'}
                loading={props.hiding}
                loadingRight={true}
            />
        );
    };

    const renderhidingErrorMsg = () => {
        if (!props.hidingErrorMsg.length) {
            return null;
        }

        return <Text style={hideUnhideErrorStyle}>{props.hidingErrorMsg}</Text>;
    };

    return (
        <ScrollView style={topLevelStyle}>
            <Input
                label="Name"
                placeholder="Enter user name"
                value={props.userName}
                helpText={userNameHelpText}
                validContext={userNameContext}
                onChangeText={props.nameChanged}
                onIdleTimeout={props.updateName}
            />
            {renderApproveButton()}
            {renderApproveErrorMsg()}
            <View style={buttonRowStyle}>
                {renderHideUnhideButton()}
                {renderAdminButton()}
            </View>
            {renderhidingErrorMsg()}
            {renderAdminErrorMsg()}
            <Button
                borderRadius={5}
                backgroundColor="#cf272a"
                onPress={dropUserPressed}
                title={props.droppingUser ? 'Removing User' : 'Remove From Organization'}
                fontWeight="600"
                disabled={props.droppingUser}
                color={props.droppingUser ? '#999' : '#fff'}
                loading={props.droppingUser}
                loadingRight={true}
            />
            {renderDroppingUserErrorMsg()}
            {renderContacts()}
            {renderBlockedMessages()}
        </ScrollView>
    );
};

const styles = {
    adminErrorStyle: {
        color: '#cf272a',
        fontSize: 16,
        marginLeft: 30,
        marginBottom: 10
    },

    approveErrorStyle: {
        color: '#cf272a',
        fontSize: 16,
        marginLeft: 15,
        marginTop: 5
    },

    blockedHeaderStyle: {
        fontSize: 18,
        marginLeft: 15,
        marginTop: 10
    },

    blockedMessageContainerStyle: {
        backgroundColor: '#eee',
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 30,
        marginRight: 15,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
    },

    blockedMessageTextStyle: {
        fontSize: 16
    },

    blockedMessageTimeStyle: {
        fontSize: 14
    },

    buttonRowStyle: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10
    },

    contactStyle: {
        fontSize: 16,
        marginLeft: 35
    },

    contactsHeaderStyle: {
        fontSize: 18,
        marginLeft: 15,
        marginTop: 10
    },

    droppingUserErrorStyle: {
        color: '#cf272a',
        fontSize: 16,
        marginLeft: 15
    },

    hideUnhideErrorStyle: {
        color: '#cf272a',
        fontSize: 16,
        marginLeft: 30,
        marginBottom: 10
    },

    topLevelStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    }
};

AdminUserDetailUi.propTypes = {
    adminWorking: PropTypes.bool.isRequired,
    adminErrorMsg: PropTypes.string.isRequired,
    approving: PropTypes.bool.isRequired,
    approvingErrorMsg: PropTypes.string.isRequired,
    contacts: PropTypes.array.isRequired,
    droppingUser: PropTypes.bool.isRequired,
    droppingUserErrorMsg: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    hiding: PropTypes.bool.isRequired,
    hidingErrorMsg: PropTypes.string.isRequired,
    isApproved: PropTypes.bool.isRequired,
    isHidden: PropTypes.bool.isRequired,
    memberId: PropTypes.number.isRequired,
    smsLogs: PropTypes.array.isRequired,
    updatingUserName: PropTypes.bool.isRequired,
    updatingUserNameDone: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userNameErrorMsg: PropTypes.string.isRequired,

    addRemoveAdmin: PropTypes.func.isRequired,
    approveUser: PropTypes.func.isRequired,
    dropUser: PropTypes.func.isRequired,
    hideUnhide: PropTypes.func.isRequired,
    nameChanged: PropTypes.func.isRequired,
    updateName: PropTypes.func.isRequired
};

export const AdminUserDetail = connect(mapAdminUserDetailProps, mapAdminUserDetailDispatch)(AdminUserDetailUi);

AdminUserDetail.navigationOptions = {
    title: 'User Details'
};
