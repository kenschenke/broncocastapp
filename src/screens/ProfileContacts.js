import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapProfileContactsProps, mapProfileContactsDispatch } from '../maps/ProfileContacts.map';
import { connect } from 'react-redux';
import { Card, CardSection, Spinner } from '../components';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ProfileContactsUi extends Component {
    componentDidMount() {
        this.props.init();
    }

    render() {
        if (this.props.fetching) {
            return (
                <Card>
                    <CardSection>
                        <Spinner size="small" label="Retrieving Contacts"/>
                    </CardSection>
                </Card>
            );
        }

        const contacts = this.props.contacts.map(contact => {
            return (
                <CardSection key={contact.ContactId} style={{ padding: 10 }}>
                    <TouchableOpacity>
                        <Ionicons name="ios-remove-circle" size={25} color="#cf2a27" style={{ paddingRight: 10 }}/>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18 }}>{contact.Contact}</Text>
                </CardSection>
            );
        });
        return (
            <View>
                <Card>
                    {contacts}
                </Card>
                <Card transparent={true}>
                    <CardSection showBorder={false} transparent={true}>
                        <TouchableOpacity>
                            <Ionicons name="ios-add-circle" size={25} color="#009e0f"/>
                            <Text>Add Phone</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="ios-add-circle" size={25} color="#009e0f"/>
                            <Text>Add Email</Text>
                        </TouchableOpacity>
                    </CardSection>
                </Card>
            </View>
        );
    }
}

ProfileContactsUi.propTypes = {
    contacts: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,

    init: PropTypes.func.isRequired
};

export const ProfileContacts = connect(mapProfileContactsProps, mapProfileContactsDispatch)(ProfileContactsUi);
