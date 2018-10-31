import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapProfileNameProps, mapProfileNameDispatch } from '../maps/ProfileName.map';
import { Input, Spinner } from '../components';
import { Text, View } from 'react-native';

class ProfileNameUi extends Component {
    componentDidMount() {
        this.props.init();
    }

    onChange = text => {
        this.props.nameChanged(text);
    };

    onIdleTimeout = () => {
        this.props.update();
    };

    renderErrorMsg() {
        if (this.props.errorMsg.length) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={{ color: '#f00', fontSize: 18 }}>{this.props.errorMsg}</Text>
                </View>
            );
        } else {
            return null;
        }
    }

    render() {
        let helpText = '';
        if (this.props.updating) {
            helpText = 'Updating';
        } else if (this.props.saved) {
            helpText = 'Changes Saved';
        }
        if (this.props.getting) {
            return (
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff', marginTop: 10 }}>
                    <Spinner size="small" label="Retrieving Name"/>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff', marginTop: 10 }}>
                    <Input
                        label="Name"
                        placeholder="Please enter your name"
                        value={this.props.name}
                        helpText={helpText}
                        onChangeText={name => this.onChange(name)}
                        onIdleTimeout={this.onIdleTimeout}
                    />

                    {this.renderErrorMsg()}
                </View>
            );
        }
    }
}

ProfileNameUi.propTypes = {
    errorMsg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    getting: PropTypes.bool.isRequired,
    updating: PropTypes.bool.isRequired,
    saved: PropTypes.bool.isRequired,

    init: PropTypes.func.isRequired,
    nameChanged: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired
};

export const ProfileName = connect(mapProfileNameProps, mapProfileNameDispatch)(ProfileNameUi);
