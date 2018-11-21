import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapMyBroadcastsProps, mapMyBroadcastsDispatch } from '../maps/MyBroadcasts.map';
import { connect } from 'react-redux';
import { Card, Spinner } from '../components';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

class MyBroadcastsUi extends Component {
    componentDidMount() {
        this.props.init();
    }

    renderBroadcastItem = ({item}) => {
        const { ShortMsgStyle } = styles;

        return (
            <TouchableOpacity onPress={() => this.props.broadcastPressed(item.BroadcastId, this.props.navigation)}>
                <Card>
                    <Text>{item.Delivered}</Text>
                    <Text numberOfLines={2} style={ShortMsgStyle}>{item.ShortMsg}</Text>
                </Card>
            </TouchableOpacity>
        );
    };

    render() {
        if (this.props.fetching) {
            return (
                <View style={styles.ContainerStyle}>
                    <Spinner size="small" label="Retrieving Broadcasts"/>
                </View>
            );
        }

        if (this.props.errorMsg) {
            return (
                <View style={styles.ContainerStyle}>
                    <Text style={{ fontSize: 18, color: '#cf2a27'}}>
                        {this.props.errorMsg}
                    </Text>
                </View>
            );
        }

        const {
            BroadcastListStyle,
            ContainerStyle
        } = styles;

        return (
            <View style={ContainerStyle}>
                <FlatList
                    data={this.props.broadcasts}
                    renderItem={this.renderBroadcastItem}
                    style={BroadcastListStyle}
                    keyExtractor={item => item.BroadcastId.toString()}
                />
            </View>
        );
    }
}

const styles = {
    BroadcastListStyle: {
        marginTop: 10
    },

    ContainerStyle: {
        flex: 1,
        padding: 10
    },

    ErrorMsgStyle: {
        fontSize: 18,
        color: '#cf272a'
    },

    ShortMsgStyle: {
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
