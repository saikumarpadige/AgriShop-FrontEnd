import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/seller/home/Home'
import EditProduct from '../../screens/seller/products/EditProduct'
const Stack = createStackNavigator();

const SellerHomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HOME" component={Home} />
            <Stack.Screen name="EDIT_DETAILS" component={EditProduct} />
        </Stack.Navigator>
    )
}

export default SellerHomeStack