import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapProfileNameProps, mapProfileNameDispatch } from '../maps/ProfileName.map';
import { Button, Input, Spinner, VerticalBox, VerticalSection } from '../components';
import { Text, View } from 'react-native';

class ProfileNameUi extends Component {
    componentDidMount() {
        this.props.init();
    }

    renderButton() {
        if (this.props.updating) {
            return <Spinner label="Updating Name"/>;
        } else {
            return <Button onPress={() => this.props.update()}>Update</Button>;
        }
    }

    render() {
        return (
            <VerticalBox>
                <View>
                    <VerticalSection>
                        <Input
                            placeholder="John Doe"
                            label="Name"
                            value={this.props.name}
                            onChangeText={name => this.props.nameChanged(name)}
                        />
                    </VerticalSection>
                </View>

                <View>
                    <Text style={{ color: '#f00'}}>{this.props.errorMsg}</Text>
                </View>

                <View>
                    {this.renderButton()}
                </View>
            </VerticalBox>
        );
    }
}

ProfileNameUi.propTypes = {
    errorMsg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    updating: PropTypes.bool.isRequired,

    init: PropTypes.func.isRequired,
    nameChanged: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired
};

export const ProfileName = connect(mapProfileNameProps, mapProfileNameDispatch)(ProfileNameUi);
