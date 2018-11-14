import React from 'react';
import PropTypes from 'prop-types';
import { mapAdminGroupsNonMembersProps, mapAdminGroupsNonMembersDispatch } from '../maps/AdminGroupNonMembers.map';
import { connect } from 'react-redux';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Spinner } from '../components';

const AdminGroupNonMembersUi = props => {
    const {
        AddingErrorStyle,
        AddingMsgStyle,
        ContainerStyle,
        ErrorMsgStyle,
        NameStyle,
        UserContainerStyle,
        UserListStyle
    } = styles;

    const renderUserItem = ({item}) => {
        if (props.addingUserId === item.UserId) {
            if (props.addingErrorMsg.length) {
                return (
                    <View style={UserContainerStyle}>
                        <Text style={AddingErrorStyle}>{props.addingErrorMsg}</Text>
                    </View>
                );
            } else if (props.adding) {
                return (
                    <View style={UserContainerStyle}>
                        <Text style={AddingMsgStyle}>Adding user to group</Text>
                    </View>
                );
            }
        }

        return (
            <View style={UserContainerStyle}>
                <TouchableOpacity onPress={() => props.addPressed(item.UserId, item.UserName)}>
                    <Ionicons name="ios-add-circle" size={30} color="#009e0f"/>
                </TouchableOpacity>
                <Text style={NameStyle}>{item.UserName}</Text>
            </View>
        );
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
    AddingErrorStyle: {
        fontSize: 18,
        color: '#cf272a'
    },

    AddingMsgStyle: {
        fontSize: 18,
        color: '#777'
    },

    ContainerStyle: {
        flex: 1,
        padding: 10
    },

    ErrorMsgStyle: {
        fontSize: 18,
        color: '#cf272a'
    },

    NameStyle: {
        fontSize: 18,
        marginLeft: 10
    },

    UserContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
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
