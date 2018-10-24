import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapProfileNameProps, mapProfileNameDispatch } from '../maps/ProfileName.map';
import { Button, Card, CardSection, Input, Spinner, VerticalBox, VerticalSection } from '../components';
import { Text, View } from 'react-native';

class ProfileNameUi extends Component {
    componentDidMount() {
        this.props.init();
    }

    renderButton() {
        if (this.props.updating) {
            return <Spinner label="Updating Name"/>;
        } else {
            return <Button onPress={this.props.update}>Update</Button>;
        }
    }

    renderErrorMsg() {
        if (this.props.errorMsg.length) {
            return (
                <CardSection showBorder={false}>
                    <Text style={{ color: '#f00'}}>{this.props.errorMsg}</Text>
                </CardSection>
            );
        } else {
            return null;
        }
    }

    render() {
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
                        onChangeText={name => this.props.nameChanged(name)}
                    />

                    {this.renderErrorMsg()}

                    <CardSection showBorder={false}>
                        {this.renderButton()}
                    </CardSection>
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

    init: PropTypes.func.isRequired,
    nameChanged: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired
};

export const ProfileName = connect(mapProfileNameProps, mapProfileNameDispatch)(ProfileNameUi);
