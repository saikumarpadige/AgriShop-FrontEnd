import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import HomeStack from './HomeStack'
import BuyerOrderStack from './BuyerOrderStack'
const { Navigator, Screen } = createBottomTabNavigator();
import { PersonIcon, HomeIcon, CartIcon, BreifcaseIcon } from '../../screens/common/Icons'
import Cart from '../../screens/buyer/cart/Cart';
import ProfileStack from './ProfileStack';

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
    appearance='noIndicator'
    style={{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 15,
    }}
  >
    <BottomNavigationTab title='Home' icon={HomeIcon} style={styles.tab} />
    <BottomNavigationTab title='Orders' icon={BreifcaseIcon} style={styles.tab} />
    <BottomNavigationTab title='Cart' icon={CartIcon} style={styles.tab} />
    <BottomNavigationTab title='Profile' icon={PersonIcon} style={styles.tab} />
  </BottomNavigation>
);

const BuyerTabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />} tabBarOptions={{
    keyboardHidesTabBar: true
  }}>
    <Screen name='Home' component={HomeStack} />
    <Screen name='Orders' component={BuyerOrderStack} />
    <Screen name='Cart' component={Cart} />
    <Screen name='Profile' component={ProfileStack} />
  </Navigator>
);

export default BuyerTabNavigator

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 1
  }
})