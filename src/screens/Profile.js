import React from 'react';
import { ProfileName } from './ProfileName';
import { ProfileContacts } from './ProfileContacts';
import { ProfileOrgs } from './ProfileOrgs';
import { createMaterialTopTabNavigator } from 'react-navigation';

export const Profile = createMaterialTopTabNavigator({
    Name: ProfileName,
    'Contact Info': ProfileContacts,
    Organizations: ProfileOrgs
}, {
    initialRouteName: 'Name',
    tabBarOptions: {
        upperCaseLabel: false,
        style: {
            backgroundColor: '#992e3a'
        },
        indicatorStyle: {
            height: 4
        }
    }
});
