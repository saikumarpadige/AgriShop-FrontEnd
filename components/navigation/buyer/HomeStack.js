import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/buyer/home/Home';
import ProductDetails from '../../screens/buyer/product/ProductDetails'
import Products from '../../screens/buyer/product/Products';
const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HOME" component={Home} />
            <Stack.Screen name="PRODUCTS" component={Products} />
            <Stack.Screen name="PRODUCT_DEATILS" component={ProductDetails} />
        </Stack.Navigator>
    )
}

export default HomeStack