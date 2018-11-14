import React from 'react';
import PropTypes from 'prop-types';
import { mapAdminRenameGroupProps, mapAdminRenameGroupDispatch } from '../maps/AdminRenameGroup.map';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Input } from '../components';
import { Button } from 'react-native-elements';

const AdminRenameGroupUi = props => {
    const {
        topLevelStyle
    } = styles;

    let helpText = '';
    let context = 'neutral';
    if (props.renaming) {
        helpText = 'Renaming Group';
    } else if (props.errorMsg.length) {
        helpText = props.errorMsg;
        context = 'error';
    }

    return (
        <View style={topLevelStyle}>
            <Input
                label="Rename Group"
                placeholder="New group name"
                value={props.groupName}
                helpText={helpText}
                validContext={context}
                onChangeText={props.groupNameChanged}
            />
            <Button
                borderRadius={5}
                backgroundColor="#006fce"
                containerViewStyle={{ flex: 1 }}
                onPress={() => props.renameGroup(props.navigation)}
                title="Rename Group"
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

AdminRenameGroupUi.propTypes = {
    renaming: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,

    renameGroup: PropTypes.func.isRequired,
    groupNameChanged: PropTypes.func.isRequired
};

export const AdminRenameGroup = connect(mapAdminRenameGroupProps, mapAdminRenameGroupDispatch)(AdminRenameGroupUi);

AdminRenameGroup.navigationOptions = {
    title: 'Rename Group'
};

