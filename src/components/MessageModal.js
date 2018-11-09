import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Text, View } from 'react-native';

export const MessageModal = props => {
    return (
        <Modal isVisible={props.show} backdropOpacity={0.35}>
            <View style={styles.modalStyle}>
                <Text>Hello, World</Text>
            </View>
        </Modal>
    );
};

MessageModal.propTypes = {
    show: PropTypes.bool.isRequired
};

const styles = {
    modalStyle: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10
    },
};
