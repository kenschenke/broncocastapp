import React, { Component } from 'react';
import { Button, Input, Spinner, VerticalBox, VerticalSection } from '../components';
import { Text, View } from 'react-native';

export class ResetPassword extends Component {
    static navigationOptions = {
        title: 'Reset Password'
    };

    constructor(props) {
        super(props);

        this.state = { savingPwd: false };
    }

    renderButtons = () => {
        if (this.state.savingPwd) {
            return <Spinner label="Saving Password"/>;
        } else {
            return (
                <View>
                    <VerticalSection>
                        <Button>Reset Password</Button>
                    </VerticalSection>
                    <VerticalSection>
                        <Button>Send Code Again</Button>
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
                        <Text>Look for an email or text message with a code</Text>
                    </VerticalSection>

                    <VerticalSection>
                        <Input
                            placeholder="Code"
                        />
                    </VerticalSection>

                    <VerticalSection>
                        <Input
                            secureTextEntry
                            placeholder="New Password"
                        />
                    </VerticalSection>

                    <VerticalSection>
                        <Input
                            secureTextEntry
                            placeholder="Confirm Password"
                        />
                    </VerticalSection>
                </View>

                <View style={{ flex: 1 }}/>

                <View style={{ flex: 1 }}>
                    {this.renderButtons()}
                </View>

                <View style={{ flex: 2 }}/>
            </VerticalBox>
        );
    }
}
