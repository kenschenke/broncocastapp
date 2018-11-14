import React from 'react';
import PropTypes from 'prop-types';
import { mapAdminGroupMembersProps, mapAdminGroupMembersDispatch } from '../maps/AdminGroupMembers.map';
import { connect } from 'react-redux';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AdminGroupMembersUi = props => {
    const {
        ContainerStyle,
        NameStyle,
        RemovingErrorStyle,
        RemovingMsgStyle,
        UserContainerStyle,
        UserListStyle
    } = styles;

    const renderUserItem = ({item}) => {
        if (props.removingMemberId === item.MemberId) {
            if (props.removingErrorMsg.length) {
                return (
                    <View style={UserContainerStyle}>
                        <Text style={RemovingErrorStyle}>{props.removingErrorMsg}</Text>
                    </View>
                );
            } else if (props.removing) {
                return (
                    <View style={UserContainerStyle}>
                        <Text style={RemovingMsgStyle}>Removing user from group</Text>
                    </View>
                );
            }
        }

        return (
            <View style={UserContainerStyle}>
                <TouchableOpacity onPress={() => props.removePressed(item.MemberId, item.UserId, item.UserName)}>
                    <Ionicons name="ios-remove-circle" size={30} color="#cf272a"/>
                </TouchableOpacity>
                <Text style={NameStyle}>{item.UserName}</Text>
            </View>
        );
    };

    return (
        <View style={ContainerStyle}>
            <FlatList
                data={props.members}
                renderItem={renderUserItem}
                style={UserListStyle}
                keyExtractor={item => item.MemberId.toString()}
            />
        </View>
    );
};

const styles = {
    ContainerStyle: {
        flex: 1,
        padding: 10
    },

    NameStyle: {
        fontSize: 18,
        marginLeft: 10
    },

    RemovingErrorStyle: {
        fontSize: 18,
        color: '#cf272a'
    },

    RemovingMsgStyle: {
        fontSize: 18,
        color: '#777'
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

AdminGroupMembersUi.propTypes = {
    removing: PropTypes.bool.isRequired,
    removingErrorMsg: PropTypes.string.isRequired,
    removingMemberId: PropTypes.number.isRequired,
    members: PropTypes.array.isRequired,

    removePressed: PropTypes.func.isRequired
};

export const AdminGroupMembers = connect(mapAdminGroupMembersProps, mapAdminGroupMembersDispatch)(AdminGroupMembersUi);

AdminGroupMembers.navigationOptions = {
    title: 'Remove Group Members'
};
