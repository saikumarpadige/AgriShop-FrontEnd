
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BuyerRegister from '../screens/auth/BuyerRegister';
import BuyerLogin from '../screens/auth/BuyerLogin';
import SellerRegister from '../screens/auth/SellerRegister';
import SellerLogin from '../screens/auth/SellerLogin';
import ChooseProfile from '../screens/common/ChooseProfile';
import BuyerTabNavigator from './buyer/BuyerTabNavigator'
import SellerTabNavigator from './seller/SellerTabNavigator';
import Loading from '../Loading';
import ProductDetails from '../screens/buyer/product/ProductDetails';
import ForgotPassword from '../screens/common/ForgotPassword';
import EditProfile from '../screens/common/EditProfile';

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LOADING" component={Loading} />
            <Stack.Screen name="CHOOSE_PROFILE" component={ChooseProfile} />
            <Stack.Screen name="BUYER_LOGIN" component={BuyerLogin} />
            <Stack.Screen name="BUYER_REGISTER" component={BuyerRegister} />
            <Stack.Screen name="SELLER_LOGIN" component={SellerLogin} />
            <Stack.Screen name="SELLER_REGISTER" component={SellerRegister} />
            <Stack.Screen name="BUYER_TAB" component={BuyerTabNavigator} />
            <Stack.Screen name="SELLER_TAB" component={SellerTabNavigator} />
            <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetails} />
            <Stack.Screen name="FORGOT_PASSWORD" component={ForgotPassword} />
        </Stack.Navigator>
    )
}

export default MainStack
