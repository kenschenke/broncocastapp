import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ProfileName } from './ProfileName';
import { ProfileContacts } from './ProfileContacts';
import { ProfileOrgs } from './ProfileOrgs';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = { selectedTabIndex: 0 };
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={{flex: 1, padding: 10}}>
                <SegmentedControlTab
                    values={['Name', 'Contact Info', 'Organizations']}
                    selectedIndex={this.state.selectedTabIndex}
                    onTabPress={index => this.setState({ selectedTabIndex: index })}
                />
                { this.state.selectedTabIndex === 0 && <ProfileName/> }
                { this.state.selectedTabIndex === 1 && <ProfileContacts/> }
                { this.state.selectedTabIndex === 2 && <ProfileOrgs/> }
            </View>
        );
    }
}
