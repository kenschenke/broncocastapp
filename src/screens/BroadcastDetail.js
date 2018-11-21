import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from '../components';
import { ScrollView, Text, View } from 'react-native';

class BroadcastDetailUi extends Component {
    renderLongMsg() {
        if (!this.props.longMsg.length) {
            return null;
        }

        const { contentStyle, labelStyle } = styles;

        return (
            <Card>
                <Text style={labelStyle}>Long Message</Text>
                <Text style={contentStyle}>{this.props.longMsg}</Text>
            </Card>
        );
    }

    renderRecipients() {
        if (!this.props.recipients.length) {
            return null;
        }

        const recips = [...this.props.recipients];
        recips.sort();

        const { contentStyle, labelStyle } = styles;

        return (
            <Card>
                <Text style={labelStyle}>Recipients</Text>
                <Text style={contentStyle}>{recips.join(', ')}</Text>
            </Card>
        );
    }

    render() {
        const {
            containerStyle,
            contentStyle,
            labelStyle
        } = styles;

        const {
            sentBy,
            isDelivered,
            time,
            shortMsg
        } = this.props;

        return (
            <View style={containerStyle}>
                <ScrollView>
                    <Card>
                        <Text style={labelStyle}>Sent By</Text>
                        <Text style={contentStyle}>{sentBy}</Text>
                    </Card>
                    <Card>
                        <Text style={labelStyle}>{isDelivered ? 'Delivered' : 'Scheduled'}</Text>
                        <Text style={contentStyle}>{time}</Text>
                    </Card>
                    <Card>
                        <Text style={labelStyle}>Short Message</Text>
                        <Text style={contentStyle}>{shortMsg}</Text>
                    </Card>
                    {this.renderLongMsg()}
                    {this.renderRecipients()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'column',
        padding: 10
    },

    contentStyle: {
        fontSize: 16,
        marginLeft: 25,
        marginTop: 10
    },

    labelStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    }
};

BroadcastDetailUi.propTypes = {
    sentBy: PropTypes.string.isRequired,
    isDelivered: PropTypes.bool.isRequired,
    time: PropTypes.string.isRequired,
    shortMsg: PropTypes.string.isRequired,
    longMsg: PropTypes.string.isRequired,
    recipients: PropTypes.array.isRequired
};

export const BroadcastDetail = connect(state => state.broadcast_detail)(BroadcastDetailUi);

BroadcastDetail.navigationOptions = {
    title: 'Broadcast Details'
};
