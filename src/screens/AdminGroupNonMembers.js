import React from 'react';
import PropTypes from 'prop-types';
import { mapAdminGroupsNonMembersProps, mapAdminGroupsNonMembersDispatch } from '../maps/AdminGroupNonMembers.map';
import { connect } from 'react-redux';
import { FlatList, Text, View } from 'react-native';
import { Spinner } from '../components';

const AdminGroupNonMembersUi = props => {
    const {
        ContainerStyle,
        ErrorMsgStyle,
        UserListStyle
    } = styles;

    const renderUserItem = ({item}) => {
        return <Text>{item.UserName}</Text>;
    };

    if (props.fetching) {
        return (
            <View style={ContainerStyle}>
                <Spinner label="Retrieving Names"/>
            </View>
        );
    } else if (props.fetchingErrorMsg.length) {
        return (
            <View style={ContainerStyle}>
                <Text style={ErrorMsgStyle}>{props.fetchingErrorMsg}</Text>
            </View>
        );
    }

    return (
        <View style={ContainerStyle}>
            <FlatList
                data={props.nonMembers}
                renderItem={renderUserItem}
                style={UserListStyle}
                keyExtractor={item => item.UserId.toString()}
            />
        </View>
    );
};

const styles = {
    ContainerStyle: {
        flex: 1,
        padding: 10
    },

    ErrorMsgStyle: {
        fontSize: 18,
        color: '#cf272a'
    },

    UserListStyle: {
        marginTop: 10
    }
};

AdminGroupNonMembersUi.propTypes = {
    adding: PropTypes.bool.isRequired,
    addingErrorMsg: PropTypes.string.isRequired,
    addingUserId: PropTypes.number.isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchingErrorMsg: PropTypes.string.isRequired,
    nonMembers: PropTypes.array.isRequired,

    addPressed: PropTypes.func.isRequired
};

export const AdminGroupsNonMembers = connect(mapAdminGroupsNonMembersProps, mapAdminGroupsNonMembersDispatch)(AdminGroupNonMembersUi);

AdminGroupsNonMembers.navigationOptions = {
    title: 'Add Group Members'
};
