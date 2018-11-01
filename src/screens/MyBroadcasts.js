import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapMyBroadcastsProps, mapMyBroadcastsDispatch } from '../maps/MyBroadcasts.map';
import { connect } from 'react-redux';
import { Card, CardSection, Spinner } from '../components';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

class MyBroadcastsUi extends Component {
    componentDidMount() {
        this.props.init();
    }

    render() {
        if (this.props.fetching) {
            return (
                <Card>
                    <CardSection>
                        <Spinner size="small" label="Retrieving Broadcasts"/>
                    </CardSection>
                </Card>
            );
        }

        const broadcasts = this.props.broadcasts.map(broadcast => {
            return (
                <TouchableOpacity
                    key={broadcast.BroadcastId}
                    onPress={() => this.props.broadcastPressed(broadcast.BroadcastId, this.props.navigation)}
                >
                    <CardSection style={{ flexDirection: 'column' }}>
                        <Text>{broadcast.Delivered}</Text>
                        <Text numberOfLines={2} style={styles.shortMsgStyle}>{broadcast.ShortMsg}</Text>
                    </CardSection>
                </TouchableOpacity>
            );
        });

        const {
            containerStyle,
            scrollViewStyle
        } = styles;

        return (
            <View style={containerStyle}>
                <Text>Tap a broadcast for details</Text>
                <ScrollView style={scrollViewStyle}>
                    {broadcasts}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        padding: 10
    },

    scrollViewStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        borderBottomWidth: 0,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    },

    shortMsgStyle: {
        fontSize: 16,
        marginTop: 10
    }
};

MyBroadcastsUi.propTypes = {
    broadcasts: PropTypes.array.isRequired,
    errorMsg: PropTypes.string.isRequired,
    fetching: PropTypes.bool.isRequired,

    broadcastPressed: PropTypes.func.isRequired,
    init: PropTypes.func.isRequired
};

export const MyBroadcasts = connect(mapMyBroadcastsProps, mapMyBroadcastsDispatch)(MyBroadcastsUi);
