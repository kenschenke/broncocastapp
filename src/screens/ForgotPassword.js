import React, { Component } from 'react';
import { Button, Input, Spinner, VerticalBox, VerticalSection } from '../components';
import { Text, View } from 'react-native';

export class ForgotPassword extends Component {
    static navigationOptions = {
        title: 'Forgot Password'
    };

    constructor(props) {
        super(props);

        this.state = { searchingForAccount: false };
    }

    findAccountPressed = () => {
        this.setState({ searchingForAccount: true });
        setTimeout(() => {
            this.props.navigation.replace('ResetPassword');
        }, 2500);
    };

    renderButtons = () => {
        if (this.state.searchingForAccount) {
            return <Spinner label="Searching For Account"/>;
        } else {
            return (
                <View>
                    <VerticalSection>
                        <Button onPress={this.findAccountPressed}>Find Account</Button>
                    </VerticalSection>
                </View>
            );
        }
    };

    render() {
        return (
            <VerticalBox>
                <View style={{ flex: 1 }}>
                    <VerticalSection>
                        <Text>Enter your email or phone number (digits only)</Text>
                    </VerticalSection>

                    <VerticalSection>
                        <Input
                            placeholder="user@example.com or 1234567890"
                        />
                    </VerticalSection>
                </View>

                <View style={{ flex: 1 }}/>

                <View style={{ flex: 1 }}>
                    {this.renderButtons()}
                </View>

                <View style={{ flex: 3 }}/>
            </VerticalBox>
        );
    }
}
