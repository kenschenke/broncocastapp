import React from 'react';
import PropTypes from 'prop-types';
import { mapAdminUserDetailProps, mapAdminUserDetailDispatch } from '../maps/AdminUserDetail.map';
import { connect } from 'react-redux';
import { Alert, Text, View } from 'react-native';
import { Button, Input } from '../components';

const AdminUserDetailUi = props => {
    let userNameHelpText = '';
    let userNameContext = 'neutral';

    if (props.updatingUserName) {
        userNameHelpText = 'Updating';
    }
    else if (props.updatingUserNameDone) {
        userNameHelpText = 'Changes saved';
    }
    else if (props.userNameErrorMsg.length) {
        userNameHelpText = props.userNameErrorMsg;
        userNameContext = 'error';
    }

    return (
        <View>
            <Input
                label="Name"
                placeholder="Enter user name"
                value={props.userName}
                helpText={userNameHelpText}
                validContext={userNameContext}
                onChangeText={props.nameChanged}
                onIdleTimeout={props.updateName}
            />
        </View>
    );
};

AdminUserDetailUi.propTypes = {
    // contacts: PropTypes.array.isRequired,
    // isAdmin: PropTypes.bool.isRequired,
    // isApproved: PropTypes.bool.isRequired,
    // isHidden: PropTypes.bool.isRequired,
    memberId: PropTypes.number.isRequired,
    // smsLogs: PropTypes.array.isRequired,
    // userId: PropTypes.number.isRequired,
    updatingUserName: PropTypes.bool.isRequired,
    updatingUserNameDone: PropTypes.bool.isRequired,
    userName: PropTypes.string.isRequired,
    userNameErrorMsg: PropTypes.string.isRequired,

    // addRemoveAdmin: PropTypes.func.isRequired,
    // approveUser: PropTypes.func.isRequired,
    // dropUser: PropTypes.func.isRequired,
    // hideUnhide: PropTypes.func.isRequired,
    nameChanged: PropTypes.func.isRequired,
    updateName: PropTypes.func.isRequired
};

export const AdminUserDetail = connect(mapAdminUserDetailProps, mapAdminUserDetailDispatch)(AdminUserDetailUi);
