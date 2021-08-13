import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
const { Navigator, Screen } = createBottomTabNavigator();
import { PersonIcon, BreifcaseIcon, HomeIcon, PlusOutlineIcon } from '../../screens/common/Icons'
import AddProduct from '../../screens/seller/products/AddProduct';
import SellerHomeStack from './SellerHomeStack';
import SellerOrderStack from './SellerOrderStack';
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
    <BottomNavigationTab title='Add Product' icon={PlusOutlineIcon} style={styles.tab} />
    <BottomNavigationTab title='Orders' icon={BreifcaseIcon} style={styles.tab} />
    <BottomNavigationTab title='Profile' icon={PersonIcon} style={styles.tab} />
  </BottomNavigation>
);

const SellerTabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />} tabBarOptions={{ keyboardHidesTabBar: true }}>
    <Screen name='Seller_Home' component={SellerHomeStack} />
    <Screen name='Add_Product' component={AddProduct} />
    <Screen name='Seller_Orders' component={SellerOrderStack} />
    <Screen name='Seller_Profile' component={ProfileStack} />
  </Navigator>
);

export default SellerTabNavigator

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 1
  }
})