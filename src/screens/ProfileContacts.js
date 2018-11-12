import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapProfileContactsProps, mapProfileContactsDispatch } from '../maps/ProfileContacts.map';
import { connect } from 'react-redux';
import { Card, CardSection, Spinner } from '../components';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatContact } from '../helpers';

class ProfileContactsUi extends Component {
    componentDidMount() {
        this.props.init();
    }

    renderErrorMsg() {
        if (!this.props.errorMsg.length) {
            return null;
        }

        return (
            <Text style={styles.errorMsgStyle}>
                {this.props.errorMsg}
            </Text>
        );
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
                <TouchableOpacity key={contact.ContactId} onPress={() => this.props.contactPressed(contact.ContactId, contact.Contact, this.props.navigation)}>
                    <CardSection style={{ padding: 10 }}>
                        <Text style={{ fontSize: 18 }}>{formatContact(contact.Contact)}</Text>
                    </CardSection>
                </TouchableOpacity>
            );
        });

        const {
            buttonContainerStyle,
            buttonLabelStyle,
            buttonStyle,
            onlyYouStyle,
            switchContainerStyle,
            switchTextStyle,
            tapTextStyle
        } = styles;

        return (
            <ScrollView>
                <Text style={tapTextStyle}>Tap a contact for more options</Text>

                <Card>
                    {contacts}
                </Card>

                <View style={buttonContainerStyle}>
                    <TouchableOpacity style={buttonStyle} onPress={() => this.props.newPhonePressed(this.props.navigation)}>
                        <Ionicons name="ios-add-circle" size={30} color="#009e0f"/>
                        <Text style={buttonLabelStyle}>Add Phone</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={buttonStyle} onPress={() => this.props.newEmailPressed(this.props.navigation)}>
                        <Ionicons name="ios-add-circle" size={30} color="#009e0f"/>
                        <Text style={buttonLabelStyle}>Add Email</Text>
                    </TouchableOpacity>
                </View>

                {this.renderErrorMsg()}

                <Text style={onlyYouStyle}>
                    Add your contact information only. Use separate accounts for
                    other family members.
                </Text>

                <View style={switchContainerStyle}>
                    <Switch value={this.props.singleMsg} onValueChange={value => this.props.singleMsgChanged(value)}/>
                    <Text style={switchTextStyle}>
                        Send long broadcasts only by email and short broadcasts
                        only by text message or notification. When off, broadcasts
                        are sent to every phone and email address in your profile.
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    buttonContainerStyle: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    buttonStyle: {
        flexDirection: 'column',
        alignItems: 'center'
    },

    buttonLabelStyle: {
        fontSize: 18
    },

    errorMsgStyle: {
        marginLeft: 10,
        marginTop: 15,
        fontSize: 18,
        color: '#cf2a27'
    },

    onlyYouStyle: {
        marginLeft: 10,
        marginTop: 15,
        color: '#4176cf'
    },

    switchContainerStyle: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        margin: 15
    },

    switchTextStyle: {
        flex: 1,
        fontSize: 15
    },

    tapTextStyle: {
        marginLeft: 10,
        marginTop: 15
    }
};

ProfileContactsUi.propTypes = {
    contacts: PropTypes.array.isRequired,
    singleMsg: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,

    contactPressed: PropTypes.func.isRequired,
    init: PropTypes.func.isRequired,
    newEmailPressed: PropTypes.func.isRequired,
    newPhonePressed: PropTypes.func.isRequired,
    singleMsgChanged: PropTypes.func.isRequired
};

export const ProfileContacts = connect(mapProfileContactsProps, mapProfileContactsDispatch)(ProfileContactsUi);
