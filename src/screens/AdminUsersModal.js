import React from 'react';
import PropTypes from 'prop-types';
import { mapAdminUsersModalProps, mapAdminUsersModalDispatch } from '../maps/AdminUsersModal.map';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Card, CardSection } from '../components';

const AdminUsersModalUi = props => {
    const {
        checkContainerStyle,
        showOptionContainerStyle,
        showOptionTextStyle,
        showTitleStyle
    } = styles;

    const renderIcon = checked => {
        if (checked) {
            return <Ionicons name="ios-checkmark" size={45}/>;
        } else {
            return null;
        }
    };

    return (
        <Modal isVisible={props.isVisible}>
            <View style={styles.modalStyle}>
                <Text style={showTitleStyle}>Show Users:</Text>
                <TouchableOpacity onPress={() => props.setFilterOn('hidehidden')}>
                    <View style={showOptionContainerStyle}>
                        <View style={checkContainerStyle}>
                            {renderIcon(props.filterOn === 'hidehidden')}
                        </View>
                        <Text style={showOptionTextStyle}>Hide hidden users</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.setFilterOn('showhidden')}>
                    <View style={showOptionContainerStyle}>
                        <View style={checkContainerStyle}>
                            {renderIcon(props.filterOn === 'showhidden')}
                        </View>
                        <Text style={showOptionTextStyle}>Show hidden users</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.setFilterOn('onlyunapproved')}>
                    <View style={showOptionContainerStyle}>
                        <View style={checkContainerStyle}>
                            {renderIcon(props.filterOn === 'onlyunapproved')}
                        </View>
                        <Text style={showOptionTextStyle}>Show only unapproved users</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.setFilterOn('onlydeliveryproblems')}>
                    <View style={showOptionContainerStyle}>
                        <View style={checkContainerStyle}>
                            {renderIcon(props.filterOn === 'onlydeliveryproblems')}
                        </View>
                        <Text style={showOptionTextStyle}>Show only users with delivery problems</Text>
                    </View>
                </TouchableOpacity>
                <Button onPress={props.closeModal}>
                    <Text>Hide me!</Text>
                </Button>
            </View>
        </Modal>
    );
};

const styles = {
    checkContainerStyle: {
        height: 50,
        width: 25
    },

    modalStyle: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10
    },

    showOptionContainerStyle: {
        marginLeft: 25,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },

    showOptionTextStyle: {
        marginLeft: 10,
        fontSize: 16
    },

    showTitleStyle: {
        fontSize: 16
    }
};

AdminUsersModalUi.propTypes = {
    filterOn: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,

    closeModal: PropTypes.func.isRequired,
    setFilterOn: PropTypes.func.isRequired
};

export const AdminUsersModal = connect(mapAdminUsersModalProps, mapAdminUsersModalDispatch)(AdminUsersModalUi);
