import React from 'react';
import PropTypes from 'prop-types';
import { mapAdminGroupDetailProps, mapAdminGroupDetailDispatch } from '../maps/AdminGroupDetail.map';
import { connect } from 'react-redux';
import { Alert, FlatList, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Spinner } from '../components';

const AdminGroupDetailUi = props => {
    const {
        ButtonRowStyle,
        ContainerStyle,
        ErrorMsgStyle,
        MemberContainerStyle,
        MemberListStyle,
        MemberNameStyle
    } = styles;

    if (props.fetching) {
        return (
            <View style={ContainerStyle}>
                <Spinner label="Retrieving group members"/>
            </View>
        );
    } else if (props.errorMsg.length) {
        return (
            <View style={ContainerStyle}>
                <Text style={ErrorMsgStyle}>{props.errorMsg}</Text>
            </View>
        );
    }

    const deleteGroupPressed = () => {
        Alert.alert(
            'Delete Group',
            'Are you sure?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', style: 'destructive', onPress: () => props.deleteGroupPressed(props.navigation) }
            ]
        );
    };

    const renderDeletingGroupErrorMsg = () => {
        if (!props.deletingGroupErrorMsg.length) {
            return null;
        }

        return <Text style={ErrorMsgStyle}>{props.deletingGroupErrorMsg}</Text>;
    };

    const renderMemberItem = ({item}) => {
        return (
            <View style={MemberContainerStyle}>
                <Text style={MemberNameStyle}>{item.UserName}</Text>
            </View>
        );
    };

    return (
        <View style={ContainerStyle}>
            <View style={ButtonRowStyle}>
                <Button
                    borderRadius={5}
                    backgroundColor="#006fce"
                    containerViewStyle={{ flex: 1 }}
                    title="Add Members"
                    fontWeight="600"
                    onPress={() => props.addMembersPressed(props.navigation)}
                />
                <Button
                    borderRadius={5}
                    backgroundColor="#006fce"
                    containerViewStyle={{ flex: 1 }}
                    title="Remove Members"
                    fontWeight="600"
                    onPress={() => props.removeMembersPressed(props.navigation)}
                />
            </View>
            <View style={ButtonRowStyle}>
                <Button
                    borderRadius={5}
                    backgroundColor="#006fce"
                    containerViewStyle={{ flex: 1 }}
                    title="Rename Group"
                    fontWeight="600"
                    onPress={() => props.renameGroupPressed(props.navigation)}
                />
                <Button
                    borderRadius={5}
                    color={props.deletingGroup ? '#999' : '#fff'}
                    backgroundColor={props.deletingGroup ? '#ccc' : '#cf272a'}
                    disabled={props.deletingGroup}
                    containerViewStyle={{ flex: 1 }}
                    title={props.deletingGroup ? 'Deleting Group' : 'Delete Group'}
                    fontWeight="600"
                    onPress={deleteGroupPressed}
                    loading={props.deletingGroup}
                    loadingRight={true}
                />
            </View>

            {renderDeletingGroupErrorMsg()}

            <FlatList
                data={props.members}
                renderItem={renderMemberItem}
                style={MemberListStyle}
                keyExtractor={item => item.MemberId.toString()}
            />
        </View>
    );
};

const styles = {
    ButtonRowStyle: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10
    },

    ContainerStyle: {
        flex: 1,
        padding: 10
    },

    ErrorMsgStyle: {
        fontSize: 18,
        color: '#cf272a'
    },

    MemberContainerStyle: {
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        borderRadius: 6,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
    },

    MemberListStyle: {
        marginTop: 10
    },

    MemberNameStyle: {
        fontSize: 18
    }
};

AdminGroupDetailUi.propTypes = {
    deletingGroup: PropTypes.bool.isRequired,
    deletingGroupErrorMsg: PropTypes.string.isRequired,
    errorMsg: PropTypes.string.isRequired,
    fetching: PropTypes.bool.isRequired,
    members: PropTypes.array.isRequired,

    addMembersPressed: PropTypes.func.isRequired,
    deleteGroupPressed: PropTypes.func.isRequired,
    removeMembersPressed: PropTypes.func.isRequired,
    renameGroupPressed: PropTypes.func.isRequired
};

export const AdminGroupDetail = connect(mapAdminGroupDetailProps, mapAdminGroupDetailDispatch)(AdminGroupDetailUi);

AdminGroupDetail.navigationOptions = {
    title: 'Group Details'
};
