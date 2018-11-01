import React from 'react';
import { AdminUsers } from './AdminUsers';
import { AdminGroups } from './AdminGroups';
import { AdminBroadcasts } from './AdminBroadcasts';
import { createMaterialTopTabNavigator } from 'react-navigation';

export const Admin = createMaterialTopTabNavigator({
    Users: AdminUsers,
    Groups: AdminGroups,
    Broadcasts: AdminBroadcasts
}, {
    initialRouteName: 'Users',
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
