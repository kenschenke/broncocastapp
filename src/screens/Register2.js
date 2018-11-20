import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapRegister2Props, mapRegister2Dispatch } from '../maps/Register2.map';
import { connect } from 'react-redux';
import { Alert, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from '../components';
import { TextInputMask } from 'react-native-masked-text';

class Register2Ui extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameHelpText: '',
            nameValidContext: 'neutral',
            phoneHelpText: '',
            phoneValidContext: 'neutral'
        };
    }

    isValidName = () => {
        return this.props.name.trim().length >= 5;
    };

    isValidPhone = () => {
        const phone = this.props.phone.replace(/[^0-9]/g, '');
        return phone.length === 0 || phone.length === 10;
    };

    nameChanged = name => {
        this.setState({ nameHelpText: '', nameValidContext: 'neutral' });
        this.props.nameChanged(name);
    };

    phoneChanged = phone => {
        this.setState({ phoneHelpText: '', phoneValidContext: 'neutral' });
        this.props.phoneChanged(phone);
    };

    registerPressed = () => {
        this.validateName();
        if (!this.isValidName()) {
            Alert.alert('Problem', 'A valid name is required');
            return;
        }

        this.validatePhone();
        if (!this.isValidPhone()) {
            Alert.alert('Problem', 'A valid phone number is required');
            return;
        }

        this.props.register(this.props.navigation);
    };

    renderErrorMsg = () => {
        if (!this.props.registerErrorMsg.length) {
            return null;
        }

        return (
            <View style={styles.ErrorMsgContainerStyle}>
                <Text style={styles.ErrorMsgLabelStyle}>{this.props.registerErrorMsg}</Text>
            </View>
        );
    };

    validateName = () => {
        if (!this.isValidName()) {
            this.setState({
                nameValidContext: 'error',
                nameHelpText: 'Name must be at least 5 characters long'
            });
        }
    };

    validatePhone = () => {
        if (!this.isValidPhone()) {
            this.setState({
                phoneValidContext: 'error',
                phoneHelpText: 'Phone number must be 10 digits'
            });
        }
    };

    render() {
        const {
            TopLevelStyle
        } = styles;

        return (
            <View style={TopLevelStyle}>

                <Text>Almost there. Just a few more questions.</Text>

                <Input
                    label="Name"
                    placeholder="Enter your full name"
                    onChangeText={this.nameChanged}
                    validContext={this.state.nameValidContext}
                    value={this.props.name}
                    onIdleTimeout={this.validateName}
                    helpText={this.state.nameHelpText}
                />

                <Input
                    label="Phone Number (optional)"
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    inputComponent={TextInputMask}
                    type="custom"
                    validContext={this.state.phoneValidContext}
                    options={{ mask: '(999) 999-9999' }}
                    onChangeText={this.phoneChanged}
                    value={this.props.phone}
                    onIdleTimeout={this.validatePhone}
                    helpText={this.state.phoneHelpText}
                />

                {this.renderErrorMsg()}

                <Button
                    borderRadius={5}
                    buttonStyle={{ marginTop: 10 }}
                    color={this.props.registering ? '#999' : '#fff'}
                    backgroundColor={this.props.registering ? '#ccc' : '#006fce'}
                    disabled={this.props.registering}
                    title={this.props.registering ? 'Registering' : 'Register'}
                    fontWeight="600"
                    onPress={this.registerPressed}
                    loading={this.props.registering}
                    loadingRight={true}
                />

            </View>
        );
    }
}

const styles = {
    ErrorMsgContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },

    ErrorMsgLabelStyle: {
        fontSize: 18,
        color: '#cf272a'
    },

    TopLevelStyle: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    }
};

Register2Ui.propTypes = {
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    registering: PropTypes.bool.isRequired,
    registerErrorMsg: PropTypes.string.isRequired,

    nameChanged: PropTypes.func.isRequired,
    phoneChanged: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};

export const Register2 = connect(mapRegister2Props, mapRegister2Dispatch)(Register2Ui);

Register2.navigationOptions = {
    title: 'Registration'
};
