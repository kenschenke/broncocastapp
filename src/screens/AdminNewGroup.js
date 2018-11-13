import React from 'react';
import PropTypes from 'prop-types';
import { mapAdminNewGroupProps, mapAdminNewGroupDispatch } from '../maps/AdminNewGroup.map';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Input } from '../components';
import { Button } from 'react-native-elements';

const AdminNewGroupUi = props => {
    const {
        topLevelStyle
    } = styles;

    let helpText = '';
    let context = 'neutral';
    if (props.addingGroup) {
        helpText = 'Adding Group';
    } else if (props.newGroupErrorMsg.length) {
        helpText = props.newGroupErrorMsg;
        context = 'error';
    }

    return (
        <View style={topLevelStyle}>
            <Input
                label="New Group"
                placeholder="New group name"
                value={props.newGroupName}
                helpText={helpText}
                validContext={context}
                onChangeText={props.groupNameChanged}
            />
            <Button
                borderRadius={5}
                backgroundColor="#006fce"
                containerViewStyle={{ flex: 1 }}
                onPress={() => props.addNewGroup(props.navigation)}
                title="Add Group"
                fontWeight="600"
            />
        </View>
    );
};

const styles = {
    topLevelStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    }
};

AdminNewGroupUi.propTypes = {
    addingGroup: PropTypes.bool.isRequired,
    newGroupErrorMsg: PropTypes.string.isRequired,
    newGroupName: PropTypes.string.isRequired,

    addNewGroup: PropTypes.func.isRequired,
    groupNameChanged: PropTypes.func.isRequired
};

export const AdminNewGroup = connect(mapAdminNewGroupProps, mapAdminNewGroupDispatch)(AdminNewGroupUi);

AdminNewGroup.navigationOptions = {
    title: 'New Group'
};
