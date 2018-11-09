import React from 'react';
import PropTypes from 'prop-types';
import { mapAdminUserDetailProps, mapAdminUserDetailDispatch } from '../maps/AdminUserDetail.map';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Button as MyButton, Input } from '../components';
import { Button } from 'react-native-elements';

const AdminUserDetailUi = props => {
    let userNameHelpText = '';
    let userNameContext = 'neutral';

    const {
        approveContainerStyle,
        approveErrorStyle,
        buttonRowStyle,
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

    const renderApprovedButton = () => {
        if (props.isApproved) {
            return null;
        }

        return (
            <View style={approveContainerStyle}>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        borderRadius={5}
                        backgroundColor="#006fce"
                        containerViewStyle={{ flex: 1 }}
                        onPress={props.approveUser}
                        title={props.approving ? 'Approving User' : 'Approve'}
                        fontWeight="600"
                        disabled={props.approving}
                        color={props.approving ? '#999' : '#fff'}
                        loading={props.approving}
                        loadingRight={true}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={approveErrorStyle}>{props.approvingErrorMsg}</Text>
                </View>
            </View>
        );
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

    return (
        <View style={topLevelStyle}>
            <Input
                label="Name"
                placeholder="Enter user name"
                value={props.userName}
                helpText={userNameHelpText}
                validContext={userNameContext}
                onChangeText={props.nameChanged}
                onIdleTimeout={props.updateName}
            />
            {renderApprovedButton()}
            <View style={buttonRowStyle}>
                {renderHideUnhideButton()}
                <MyButton>Add Admin</MyButton>
            </View>
            <Text style={hideUnhideErrorStyle}>{props.hidingErrorMsg}</Text>
            <View style={buttonRowStyle}>
                <MyButton>Remove From Organization</MyButton>
            </View>
        </View>
    );
};

const styles = {
    approveContainerStyle: {
        flexDirection: 'column',
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },

    approveErrorStyle: {
        color: '#cf272a',
        fontSize: 16,
        marginLeft: 15
    },

    buttonRowStyle: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
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
    approving: PropTypes.bool.isRequired,
    approvingErrorMsg: PropTypes.string.isRequired,
    // contacts: PropTypes.array.isRequired,
    // isAdmin: PropTypes.bool.isRequired,
    hiding: PropTypes.bool.isRequired,
    hidingErrorMsg: PropTypes.string.isRequired,
    isApproved: PropTypes.bool.isRequired,
    isHidden: PropTypes.bool.isRequired,
    memberId: PropTypes.number.isRequired,
    // smsLogs: PropTypes.array.isRequired,
    // userId: PropTypes.number.isRequired,
    updatingUserName: PropTypes.bool.isRequired,
    updatingUserNameDone: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userNameErrorMsg: PropTypes.string.isRequired,

    // addRemoveAdmin: PropTypes.func.isRequired,
    approveUser: PropTypes.func.isRequired,
    // dropUser: PropTypes.func.isRequired,
    hideUnhide: PropTypes.func.isRequired,
    nameChanged: PropTypes.func.isRequired,
    updateName: PropTypes.func.isRequired
};

export const AdminUserDetail = connect(mapAdminUserDetailProps, mapAdminUserDetailDispatch)(AdminUserDetailUi);
