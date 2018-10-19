import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapSignInProps, mapSignInDispatch } from '../maps/SignIn.map';
import { Button, Input, Spinner, VerticalBox, VerticalSection } from '../components';
import { Text, View } from 'react-native';

class SignInUi extends Component {
    static navigationOptions = {
        title: 'Sign In'
    };

    constructor(props) {
        super(props);

        this.state = { username: '', password: '' };
    }

    componentDidMount() {
        this.props.init();
    }

    renderButtons() {
        if (this.props.signingIn) {
            return <Spinner label="Signing In"/>;
        } else {
            return (
                <View>
                    <VerticalSection>
                        <Button onPress={this.signInPressed}>Sign In</Button>
                    </VerticalSection>

                    <VerticalSection>
                        <Button onPress={() => this.props.navigation.navigate('Register')}>Register</Button>
                        <Button onPress={() => this.props.navigation.navigate('ForgotPassword')}>Forgot Password</Button>
                    </VerticalSection>
                </View>
            );
        }
    }

    signInPressed = () => {
        this.props.signIn(this.state.username, this.state.password, this.props.navigation);
    };

    render() {
        return (
            <VerticalBox>
                <View style={{ flex: 1 }}>
                    <VerticalSection>
                        <Input
                            placeholder="user@email.com"
                            label="Email"
                            value={this.state.username}
                            onChangeText={username => this.setState({ username })}
                        />
                    </VerticalSection>

                    <VerticalSection>
                        <Input
                            secureTextEntry
                            placeholder="password"
                            label="Password"
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                        />
                    </VerticalSection>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#f00'}}>{this.props.errorMsg}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    {this.renderButtons()}
                </View>
                <View style={{ flex: 4 }}/>
            </VerticalBox>
        );
    }
}

SignInUi.propTypes = {
    signingIn: PropTypes.bool.isRequired,

    init: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired
};

export const SignIn = connect(mapSignInProps, mapSignInDispatch)(SignInUi);
