import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import { CardSection } from '../components';

class BroadcastDetailUi extends Component {
    renderLongMsg() {
        if (!this.props.longMsg.length) {
            return null;
        }

        const { contentStyle, labelStyle, sectionStyle } = styles;

        return (
            <CardSection>
                <View style={sectionStyle}>
                    <Text style={labelStyle}>Long Message</Text>
                    <Text style={contentStyle}>{this.props.longMsg}</Text>
                </View>
            </CardSection>
        );
    }

    renderRecipients() {
        if (!this.props.recipients.length) {
            return null;
        }

        const recips = [...this.props.recipients];
        recips.sort();

        const { contentStyle, labelStyle, sectionStyle } = styles;

        return (
            <CardSection>
                <View style={sectionStyle}>
                    <Text style={labelStyle}>Recipients</Text>
                    <Text style={contentStyle}>{recips.join(', ')}</Text>
                </View>
            </CardSection>
        );
    }

    render() {
        const {
            containerStyle,
            contentStyle,
            labelStyle,
            sectionStyle,
            scrollViewStyle
        } = styles;

        const {
            sentBy,
            delivered,
            shortMsg
        } = this.props;

        return (
            <View style={containerStyle}>
                <ScrollView style={scrollViewStyle}>
                    <CardSection>
                        <View style={sectionStyle}>
                            <Text style={labelStyle}>Sent By</Text>
                            <Text style={contentStyle}>{sentBy}</Text>
                        </View>
                    </CardSection>
                    <CardSection>
                        <View style={sectionStyle}>
                            <Text style={labelStyle}>Delivered</Text>
                            <Text style={contentStyle}>{delivered}</Text>
                        </View>
                    </CardSection>
                    <CardSection>
                        <View style={sectionStyle}>
                            <Text style={labelStyle}>Short Message</Text>
                            <Text style={contentStyle}>{shortMsg}</Text>
                        </View>
                    </CardSection>
                    {this.renderLongMsg()}
                    {this.renderRecipients()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        // flex: 1,
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
    },

    sectionStyle: {
        flexDirection: 'column'
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
        borderBottomWidth: 0
    },
};

BroadcastDetailUi.propTypes = {
    sentBy: PropTypes.string.isRequired,
    delivered: PropTypes.string.isRequired,
    shortMsg: PropTypes.string.isRequired,
    longMsg: PropTypes.string.isRequired,
    recipients: PropTypes.array.isRequired
};

export const BroadcastDetail = connect(state => state.broadcast_detail)(BroadcastDetailUi);

BroadcastDetail.navigationOptions = {
    title: 'Broadcast Details'
};
