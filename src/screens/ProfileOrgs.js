import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapProfileOrgsProps, mapProfileOrgsDispatch } from '../maps/ProfileOrgs.map';
import { connect } from 'react-redux';
import { Input, Spinner } from '../components';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ProfileOrgsUi extends Component {
    componentDidMount() {
        this.props.init();
    }

    removeOrgPressed = MemberId => {
        Alert.alert(
            'Drop Organization',
            'Are you sure?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', style: 'destructive', onPress: () => this.props.removeOrg(MemberId) }
            ]
        );
    };

    render() {
        if (this.props.fetching) {
            return <Spinner size="small" label="Retrieving Organizations"/>;
        }

        const {
            containerStyle,
            orgContainerStyle,
            orgTextStyle
        } = styles;

        const orgs = this.props.orgs.map(org => {
            return (
                <View key={org.MemberId} style={orgContainerStyle}>
                    <TouchableOpacity onPress={() => this.removeOrgPressed(org.MemberId)}>
                        <Ionicons name="ios-remove-circle" size={30} color="#cf2a27"/>
                    </TouchableOpacity>
                    <Text style={orgTextStyle}>{org.OrgName + (org.IsAdmin ? ' (Admin)' : '')}</Text>
                </View>
            );
        });

        return (
            <ScrollView style={containerStyle}>
                {orgs}

                <Input
                    helpText={this.props.errorMsg}
                    label="Enter tag to join an organization"
                    value={this.props.joinTag}
                    onChangeText={value => this.props.joinTagChanged(value)}
                    validContext={this.props.isValid ? 'neutral' : 'error' }
                />

                <View style={{ flexDirection: 'row' }}>
                    <Button
                        borderRadius={5}
                        containerViewStyle={{ flex: 1 }}
                        backgroundColor="#006fce"
                        fontWeight="600"
                        title="Join"
                        onPress={this.props.joinPressed}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 10
    },

    orgContainerStyle: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    orgTextStyle: {
        marginLeft: 10,
        fontSize: 18
    }
};

ProfileOrgsUi.propTypes = {
    orgs: PropTypes.array.isRequired,
    errorMsg: PropTypes.string.isRequired,
    fetching: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    joinTag: PropTypes.string.isRequired,

    init: PropTypes.func.isRequired,
    joinPressed: PropTypes.func.isRequired,
    joinTagChanged: PropTypes.func.isRequired,
    removeOrg: PropTypes.func.isRequired
};

export const ProfileOrgs = connect(mapProfileOrgsProps, mapProfileOrgsDispatch)(ProfileOrgsUi);
