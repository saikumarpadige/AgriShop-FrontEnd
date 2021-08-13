import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../screens/buyer/profile/Profile';
import EditProfile from '../../screens/common/EditProfile';
import ChangePassword from '../../screens/common/ChangePassword';
const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PROFILE" component={Profile} />
            <Stack.Screen name="EDIT_PROFILE" component={EditProfile} />
            <Stack.Screen name="CHANGE_PASSWORD" component={ChangePassword} />
        </Stack.Navigator>
    )
}

export default ProfileStack